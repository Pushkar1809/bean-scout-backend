import { FastifyInstance, FastifyRequest } from "fastify";
import { UserController } from "../controllers/user.controller";
import { OAuth2Client } from "google-auth-library";
import { Types } from "mongoose";

export const userRoutes = (app: FastifyInstance) => {
	const userController = new UserController();

	app.get("/user/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
		const id = request.params.id;
		const userId = new Types.ObjectId(id);
		const user = await userController.getUser(userId);
		reply.send({ data: user });
	});

	app.post("/user/auth", async (_, reply) => {
		reply.header("access-control-allow-origin", "*");
    reply.header("access-control-allow-credentials", "true");
    reply.header("referrer-policy", "no-referrer-when-downgrade");

    const redirectUrl = "http://localhost:8080/oauth2/google/callback";

    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_OAUTH_CLIENT_ID,
      process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: "offline",
			scope: "https://www.googleapis.com/auth/userinfo.profile  openid ",
			prompt: "consent",
		});

		reply.send({ url: authorizeUrl });
	});

	app.put("/user/:id", async (request: FastifyRequest<{ Params: { id: string }; Body: { address: string } }>, reply) => {
		const id = request.params.id;
		const userId = new Types.ObjectId(id);
		const address = request.body.address;
		const updatedUser = await userController.updateAddress(userId, address);
		reply.send({data: updatedUser});
	})

  app.get(
		"/oauth2/google/callback",
		async (
			request: FastifyRequest<{ Querystring: { code: string } }>,
			reply,
		) => {
			const code = request.query.code;
			let userId: Types.ObjectId | null = null;
			try {
				const redirectUrl = "http://localhost:8080/oauth2/google/callback";
				const oAuth2Client = new OAuth2Client(
					process.env.GOOGLE_OAUTH_CLIENT_ID,
					process.env.GOOGLE_OAUTH_CLIENT_SECRET,
					redirectUrl,
				);
				const token = await oAuth2Client.getToken(code);
				await oAuth2Client.setCredentials(token.tokens);
				const user = oAuth2Client.credentials;

				if (user.access_token)
					userId = await userController.getUserData(user.access_token);

				console.log(userId);

			} catch (error) {
				console.error(error);
				userId = null;
			}
			reply.code(303).redirect(`http://localhost:5173?userId=${userId?.toString()}`);
		},
	);
};
