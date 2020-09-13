import React, { useState } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { useQuery, gql } from '@apollo/react-hooks';

import Loader from '../../../components/Loader';
import SquarePhoto from '../../../components/SquarePhoto';

const SEARCH = gql`
  query search($term: String!) {
    searchPost(term: $term) {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
    searchUser(term: $term) {
      id
      avatar
      username
      isFollowing
      isSelf
    }
  }
`;

const SearchPresenter = ({ term, shouldFetch }) => {
  const { data, loading, refetch } = useQuery(SEARCH, {
    variables: {
      term,
    },
    skip: !shouldFetch,
    fetchPolicy: 'network-only', // 항상 네트워크에 요청 (캐시 사용 X)
  });

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch({ variables: { term } });
    } catch (e) {
    } finally {
      setRefreshing(false);
    }
  };

  const renderItem = ({ item }) => <SquarePhoto key={item.id} {...item} />;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.searchPost && (
          <FlatList
            data={data.searchPost}
            renderItem={renderItem}
            onRefresh={onRefresh}
            refreshing={refreshing}
            numColumns={3}
          />
        )
      )}
    </>
  );
};

SearchPresenter.propTypes = {
  term: PropTypes.string.isRequired,
  shouldFetch: PropTypes.bool.isRequired,
};

export default SearchPresenter;
