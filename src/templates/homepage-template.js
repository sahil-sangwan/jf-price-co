import React from 'react';
import { graphql } from 'gatsby';
import parse from "html-react-parser";
import Layout from '../components/layout/layout';
import HomepageSegment from '../components/homepageSegment';
import ColumnGroup from '../components/columns';
import { PageButton } from '../components/pageNavButton';
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const divStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const slideStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundSize: 'cover',
    height: '350px',
    width: '350px'
}

const Slideshow = () => {
    return (
        <div>
            <Slide>
                <div style={slideStyle}>
                    {/* <StaticImage style={{ width: '100%', aspectRatio: '16/9' }} objectPosition="center" src={ProjectsImage} alt="Plymouth Quarries" layout="constrained" loading="eager" /> */}
                    {/* <img src={ProjectsImage} alt="Plymouth Quarries" style={{ width: '800px', height: '600px' }} /> */}
                </div>
                <div style={slideStyle}>
                    {/* <StaticImage style={{ width: '100%', aspectRatio: '16/9' }} objectPosition="center" src={ProjectsImage} alt="Plymouth Quarries" layout="constrained" loading="eager" /> */}
                    {/* <img src={VeneerImage} alt="Plymouth Quarries" style={{ width: '800px', height: '600px' }} /> */}
                </div>
                {/* <div style={slideStyle}>
                    <StaticImage style={{ width: '100%', aspectRatio: '16/9' }} objectPosition="center" src={VeneerImage} alt="Plymouth Quarries" layout="constrained" loading="eager" />
                </div>
                <div style={slideStyle}>
                    <StaticImage style={{ width: '100%', aspectRatio: '16/9' }} objectPosition="center" src="./ProductDisplay.jpg" alt="Plymouth Quarries" layout="constrained" loading="eager" />
                </div>
                <div style={slideStyle}>
                    <StaticImage style={{ width: '100%', aspectRatio: '16/9' }} objectPosition="center" src="./homepage_beautyshot.jpg" alt="Plymouth Quarries" layout="constrained" loading="eager" />
                </div> */}
            </Slide>

        </div>
    )
}

const HomepageTemplate = ({ data: { productPostList, commercialPostList, mediaPostList, servicesPostList } }) => {
    return (
        <Layout>
            <p style={{ color: 'white', fontSize: '18px', marginBottom: '55px' }}>
                Plymouth Quarries of Hingham, MA, is a vibrant modern stone quarry supplying masonry, hardscape, and landscape materials since 1915.
                We supply the right stone and earth products to create the enduring look and function you want; from the simple weekend homeowner projects
                to the stone for Boston College, Yale University, and many more prominent institutions. We are committed to making sure you have
                everything you need to get your project done.
            </p>
            {/* <h2 style={{ color: 'white', textAlign: 'center' }}>
                What project would you like to start?
            </h2> */}
            {/* <HomepageSegment style={{ marginBottom: '55px' }}>
                <Card>
                    <StaticImage style={{ borderRadius: '10px 10px 0 0', height: '85%' }} objectPosition="center" src="./pool.jpg" alt="Plymouth Quarries" layout="constrained" />
                    <h4 style={{ color: 'black' }}>Pools</h4>
                </Card>
                <Card as='a' href='/fireplaces'>
                    <StaticImage style={{ borderRadius: '10px 10px 0 0', height: '85%' }} objectPosition="center" src="./fireplace.jpg" alt="Plymouth Quarries" layout="constrained" />
                    <h4 style={{ color: 'black' }}>Fireplaces</h4>
                </Card>
                <Card>
                    <StaticImage style={{ borderRadius: '10px 10px 0 0', height: '85%' }} objectPosition="center" src="./firepit.jpg" alt="Plymouth Quarries" layout="constrained" />
                    <h4 style={{ color: 'black' }}>Firepits</h4>
                </Card>
            </HomepageSegment> */}
            <h2 style={{ color: 'white', textAlign: 'center' }}>
                Plymouth Quarries and JF PRICE
            </h2>
            <HomepageSegment style={{ flexFlow: "row nowrap", alignItems: 'center', alignContent: 'center', marginBottom: '55px' }}>
                <a href='https://www.jfpriceco.com/' style={{ color: 'white' }}><StaticImage style={{ width: 'auto', height: '25%' }} src="../images/LogoJFPriceWeb.png" alt="Plymouth Quarries" layout="constrained" /></a>
                <p style={{ width: '50%', textAlign: 'start', fontSize:'18px' }}>Plymouth Quarries and JF PRICE have worked together for years quarrying our Weymouth Granite stone. The two companies have merged to offer the most complete line of stone products and services.
                    JF PRICE will continue to specialize in loam and aggregates along with all our Plymouth Quarries products. We are one company dedicated to the most complete line of quality stone products and services.</p>
            </HomepageSegment>
            <HomepageSegment style={{ marginBottom: '55px' }}>
                <h1 style={{ marginBottom: '0', color: "white" }}> New Arrivals </h1>
                <ColumnGroup>
                    {productPostList.posts.nodes.slice(0, 2).map(product => {
                        const featuredImage = {
                            data: product.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
                            alt: product.featuredImage?.node?.alt || ``,
                        }
                        return (
                            <div>
                                <h2 style={{ color: "white" }}>{parse(product.title)}</h2>
                                {featuredImage?.data && (
                                    <GatsbyImage
                                        image={featuredImage.data}
                                        alt={featuredImage.alt}
                                        style={{ marginBottom: 50 }}
                                    />
                                )}
                                <p style={{ color: "white" }}>{parse(product.excerpt)}</p>
                                <PageButton href={`/products/${product.slug}`}>
                                    See more details →
                                </PageButton>
                            </div>
                        )
                    })}
                </ColumnGroup>
                {/* <PageButton href="/products">
                    Browse all products →
                </PageButton> */}
            </HomepageSegment>
        </Layout>
    );
};

export const query = graphql`
    query {
        productPostList: wpCategory(name: {eq: "Products"}) {
            ...recentPosts
        }
        commercialPostList: wpCategory(name: {eq: "Commercial"}) {
            ...recentPosts
        }
        mediaPostList: wpCategory(name: {eq: "Media"}) {
            ...recentPosts
        }   
        servicesPostList: wpCategory(name: {eq: "Services"}) {
            ...recentPosts
        }     
    }
    fragment recentPosts on WpCategory {
        posts {
            nodes {
                title
                slug
                excerpt
                featuredImage {
                    node {
                        altText
                        localFile {
                            childImageSharp {
                                gatsbyImageData(quality: 100, placeholder: DOMINANT_COLOR, layout: FULL_WIDTH)
                            }
                        }
                    }
                }
            }
        }
    }
`;

export default HomepageTemplate;