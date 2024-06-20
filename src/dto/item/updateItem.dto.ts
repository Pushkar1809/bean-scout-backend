export interface UpdateItemDto {
	name?: string;
	price?: number;
	description?: string;
	status?: boolean;
	reviewCount?: number;
	rating?: number;
	categoryId?: string;
	imageUrl?: string;
}
