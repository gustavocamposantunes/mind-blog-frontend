import { useNavigate } from 'react-router-dom'
import { Autoplay, Parallax } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { ErrorMessage } from '../atoms'
import { PublishedByInfo } from '../molecules'
import { Button } from '../ui/button'
import { Skeleton } from '../ui/skeleton'

import { CustomCard } from './CustomCard'

import type { ArticleModel } from '@/domain/models'
import type React from 'react'

import 'swiper/css'

interface IFavouritesSlider {
  error: Error | null
  isLoading: boolean
  articles?: ArticleModel[]
}

export const FavouritesSlider: React.FC<IFavouritesSlider> = ({
  error,
  isLoading,
  articles,
}) => {
  const navigate = useNavigate()

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
      data-testid="favourites-slider"
    >
      {articles?.map(({ ...props }) => (
        <SwiperSlide key={props.id}>
          <CustomCard
            id={String(props.id)}
            headerImageSrc={props.image}
            imageClassName="h-64 object-cover md:h-96 lg:h-[32rem]"
            title={props.title}
            description={props.content}
            category={props.category}
            onClick={() => {
              navigate(`/articles/${props.id}`)
            }}
            footer={
              <>
                <PublishedByInfo
                  avatar={props.author.avatar}
                  author={props.author.firstName}
                  publishedAt={props.publishedAt}
                />
                <Button className="orange-btn action-btn uppercase">
                  Ler mais
                </Button>
              </>
            }
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
