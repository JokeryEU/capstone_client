import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to OneStopShop',
  description: 'Find the cheapest products for your needs',
  keywords: 'smartphones, computers, cheap computers, cheap smartphones',
}

export default Meta
