'use client'
import { useEffect, useMemo, useState } from 'react'
import { isNull } from 'lodash'
import { Text } from '@/components'
import { Page } from '@/types'
import { ArticleCover, NotFoundComponent, PageWrapper, RelatedArticles, RelatedLinks } from '@/components'
import { ImageCardItem } from '@/types/components'
import { onEntryChange } from '@/config'
import { getPersonalizeAttribute, isDataInLiveEdit, removeSpecialChar } from '@/utils'
import useRouterHook from '@/hooks/useRouterHook'
import { setDataForChromeExtension } from '@/utils'
import { usePersonalization } from '@/context'
import { articleJSONRtePathIncludes } from '@/services/helper'
import { getEntries, getEntryByUrl } from '@/services'

// Helper: read LP hash from URL (preferred) or cookie set by middleware
function getLivePreviewHash(): string | undefined {
  if (typeof window === 'undefined') return undefined
  const sp = new URLSearchParams(window.location.search)
  const fromUrl = sp.get('live_preview')
  if (fromUrl) return fromUrl
  // fallback to cookie (middleware sets cs_live_preview)
  const m = document.cookie.match(/(?:^|;\s*)cs_live_preview=([^;]+)/)
  return m ? decodeURIComponent(m[1]) : undefined
}

/**
 * @component Article - Article Component (Slug Based)
 *
 * @route '/{locale}/article/{slug}'
 * @description Component that renders the article page based on the slug
 */
export default function Article () {
  const { personalizationSDK, personalizeConfig } = usePersonalization()
  const [data, setData] = useState<Page.ArticlePage['entry'] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [articles, setArticles] = useState<Page.ArticlePage['articles'] | null>(null)
  const [relatedLinks, setRelatedLinks] = useState<Page.ArticleListingPage['entry'][] | []>([])
  const { path, locale } = useRouterHook()

  // Read the LP hash once per render cycle
  const lp = useMemo(getLivePreviewHash, [])

  const taxonomy_path = personalizeConfig?.taxonomy_path

  // Personalization attributes
  useEffect(() => {
    const setAttribute = async () => {
      const audiences = personalizeConfig?.audiences
      const criteria =
        (taxonomy_path?.toLowerCase() === data?.taxonomies?.[0]?.taxonomy_uid.toLowerCase())
          ? data?.taxonomies?.[0]?.term_uid.toLowerCase()
          : data?.taxonomies?.[1]?.term_uid.toLowerCase()
      const attributes = getPersonalizeAttribute(audiences, removeSpecialChar(String(criteria)))
      await personalizationSDK?.set({ ...attributes })
    }
    if (personalizeConfig && data) setAttribute()
  }, [personalizeConfig, taxonomy_path, data, personalizationSDK])

  // Fetch the article entry (pass lp so services use preview host)
  const fetchData = async () => {
    try {
      const jsonRtePaths = [...articleJSONRtePathIncludes]
      const entryData = await getEntryByUrl(
        'article',
        locale,
        path,
        [],
        jsonRtePaths,
        personalizationSDK,
        lp // ← pass the live_preview hash
      ) as Page.ArticlePage['entry']

      setData(entryData)
      setDataForChromeExtension({ entryUid: entryData?.uid || '', contenttype: 'article', locale })
      if (!entryData && !isNull(entryData)) throw '404'
    } catch (err) {
      console.error('🚀 ~ article.tsx ~ fetchData ~ err:', err)
      setLoading(false)
    }
  }

  // Fetch related links & articles (also pass lp)
  const fetchArticles = async () => {
    try {
      if (data && data?.taxonomies?.length > 0) {
        if (show_related_links) {
          const filterQuery = data.taxonomies?.map((elem) => ({
            url: `/articles/${elem.taxonomy_uid}/${elem.term_uid.replaceAll('_', '-')}` as string
          }))
          const listingData = await getEntries(
            'article_listing_page',
            locale,
            [],
            [],
            { queryOperator: 'or', filterQuery },
            personalizationSDK,
            0,
            lp // ← pass the live_preview hash
          ) as Page.ArticleListingPage['entry'][]
          listingData && setRelatedLinks(listingData)
        }

        if (show_related_articles) {
          const groupedData = data.taxonomies?.reduce((acc, { taxonomy_uid, term_uid }) => {
            acc[taxonomy_uid] = acc[taxonomy_uid] || []
            acc[taxonomy_uid].push(term_uid)
            return acc
          }, {} as Record<string, string[]>)

          const filterQuery = Object.entries(groupedData || {}).map(([taxonomy_uid, term_uids]) => ({
            [`taxonomies.${taxonomy_uid}`]: term_uids
          }))

          const articlesData = await getEntries<Page.ArticlePage['articles'][]>(
            'article',
            locale,
            [],
            [],
            { queryOperator: 'or', filterQuery },
            personalizationSDK,
            0,
            lp // ← pass the live_preview hash
          )

          const filteredArticles = articlesData?.filter((article) => article.uid !== data?.uid)
          filteredArticles && setArticles(filteredArticles as any)
        }
      } else {
        setRelatedLinks([])
        setArticles([])
      }
    } catch (err) {
      console.error('🚀 ~ article.tsx ~ fetchArticles ~ err:', err)
      setArticles([])
    }
  }

  // Handle data fetching on load + live preview entry change
  useEffect(() => {
    onEntryChange(fetchData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, lp])

  // Fetch related articles when main entry loads/changes
  useEffect(() => {
    fetchArticles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, lp])

  const { content, title, summary, cover_image, show_related_links, related_links, show_related_articles, related_articles, $ } = data || {}

  const cards: ImageCardItem[] | [] = (articles || [])?.map((article) => ({
    title: article?.title,
    content: article?.summary,
    image: article?.cover_image,
    $: article?.$,
    cta: article?.url
  })) as ImageCardItem[] | []

  const relatedArticles = cards && cards.splice(
    0,
    (data?.related_articles?.number_of_articles && data?.related_articles?.number_of_articles <= 6)
      ? related_articles?.number_of_articles
      : 6
  )

  return (
    data ? (
      <PageWrapper {...data}>
        <ArticleCover
          title={title}
          summary={summary}
          cover_image={cover_image}
          $={$}
          _content_type_uid={'article'}
        />
        <Text content={content} $={$} id={'article-content'} />
        {data?.taxonomies?.length > 0 && show_related_links && (
          <RelatedLinks
            relatedLinks={relatedLinks}
            relatedLinksLabel={related_links}
            $={data?.$}
          />
        )}
        {show_related_articles && relatedArticles && relatedArticles.length > 0 && (
          <RelatedArticles related_articles={related_articles} cards={relatedArticles} />
        )}
      </PageWrapper>
    ) : (!loading && !isDataInLiveEdit() && <NotFoundComponent />)
  )
}