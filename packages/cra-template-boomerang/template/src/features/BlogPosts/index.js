import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actions as blogPostActions } from 'State/blogPosts';
import Loading from 'Components/Loading';
import BlogPost from './BlogPost';
import {
  PRODUCT_SERVICE_ENV_URL,
  REQUEST_STATUSES,
} from 'Config/servicesConfig';

export class BlogPostsContainer extends Component {
  static propTypes = {
    blogPostActions: PropTypes.object.isRequired,
    blogPosts: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.props.blogPostActions.fetchPosts(`${PRODUCT_SERVICE_ENV_URL}/posts`);
  }

  componentWillUnmount() {
    const { blogPosts, blogPostActions } = this.props;
    if (blogPosts.isFetching) {
      blogPostActions.cancelFetchPosts();
    }
  }

  render() {
    const { blogPosts } = this.props;
    if (blogPosts.isFetching) {
      return <Loading />;
    }

    if (blogPosts.status === REQUEST_STATUSES.SUCCESS) {
      return blogPosts.data.map(post => {
        return <BlogPost key={post.id} {...post} />;
      });
    }

    return null;
  }
}

const mapStateToProps = state => ({
  blogPosts: state.blogPosts,
});

const mapDispatchToProps = dispatch => ({
  blogPostActions: bindActionCreators(blogPostActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogPostsContainer);
