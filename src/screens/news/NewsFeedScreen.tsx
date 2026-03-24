import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Colors} from '@theme/index';
import {newsApi} from '@services/api';
import type {NewsArticle} from '@appTypes/index';

/**
 * News Feed — Intel screen
 * Pulls from chosen sources (Reuters, Al Jazeera, security bulletins)
 * Ad slots ready for monetization. Future: AI personalization.
 */
export default function NewsFeedScreen() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      try {
        const {data} = await newsApi.getFeed({category: activeCategory === 'all' ? undefined : activeCategory});
        setArticles(data);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [activeCategory]);

  return (
    <View style={styles.container}>
      {/*
        TODO: Design implementation
        - Header: "Intel Feed" + filter icon
        - Category pills: All · Security · Geopolitical · Regional
        - FlatList of ArticleCard:
            - Source logo + source name + timestamp
            - Article image (if available)
            - Title (bold)
            - Summary (2 lines)
            - Risk badge (Low/Medium/High) for security articles
            - Region tags
        - Ad card slots (every 5th item)
        - Pull-to-refresh
        - Empty state / loading skeletons
      */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.background},
});
