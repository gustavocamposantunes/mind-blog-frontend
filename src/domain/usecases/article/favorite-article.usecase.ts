import type { FavouriteModel } from "@/domain/models";

export interface FavouriteArticleUseCase {
  favorite(id: number, token: string): Promise<FavouriteModel>
}
