import { Autoplay, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ErrorMessage } from '../atoms'
import { Skeleton } from '../ui/skeleton'

import { ArticleCard } from './ArticleCard'

import type React from 'react'

import 'swiper/css'

interface IFavouritesSlider {
  error: Error | null
  isLoading: boolean
  articles?: {
    id: number
    title: string
    content: string
    image?: string
  }[]
}

export const FavouritesSlider: React.FC<IFavouritesSlider> = ({
  error,
  isLoading,
  articles,
}) => {
  if (error) return <ErrorMessage error={error} />
  if (isLoading)
    return (
      <Skeleton
        className=" w-full xl:col-span-2"
        data-testid="skeleton-slider"
      />
    )

  return (
    <Swiper
      modules={[Autoplay, Parallax]}
      spaceBetween={50}
      slidesPerView={1}
      className=" w-full xl:col-span-2"
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      parallax={true}
      loop={true}
      data-testid="favourites-slider"
    >
      {articles?.map(({ ...props }) => (
        <SwiperSlide>
          <ArticleCard key={props.id} {...props} redirect={String(props.id)} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
