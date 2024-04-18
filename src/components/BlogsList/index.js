import {Component} from 'react'

import {TailSpin as Pk} from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import './index.css'

class BlogsList extends Component {
  state = {
    blogsData: [],
    isLoading: true,
  }

  componentDidMount() {
    this.fetchingData()
  }

  fetchingData = async () => {
    const data = await fetch('https://apis.ccbp.in/blogs')
    const response = await data.json()
    const formattedData = response.map(each => ({
      id: each.id,
      title: each.title,
      imageUrl: each.image_url,
      avatarUrl: each.avatar_url,
      author: each.author,
      topic: each.topic,
    }))
    this.setState({blogsData: formattedData, isLoading: false})
  }

  render() {
    const {blogsData} = this.state
    const {isLoading} = this.state
    return (
      <div className="blog-list-container">
        {isLoading ? (
          <Pk type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
