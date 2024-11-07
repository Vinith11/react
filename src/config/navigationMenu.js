export const navigation = {
    categories: [
      {
        id: 'jersey',
        name: 'Jersey',
        featured: [
          {
            name: 'New Arrivals',
            href: '/',
            imageSrc: require('../assets/nav/1cr7.jpg'),
            imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          },
          {
            name: 'Basic Tees',
            href: '/',
            imageSrc: require('../assets/nav/1ms10.jpeg'),
            imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          },
        ],
        sections: [
          {
            id: 'pl',
            name: 'Premier League',
            items: [
              { name: 'Manchester United', id:"mufc", href: `jersey/pl/mufc` },
              { name: 'Manchester City', id:"mcfc", href: `jersey/pl/mcfc` },
              { name: 'Liverpool', id:"lfc", href: `jersey/pl/lfc` },
              { name: 'Arsenal', id:"afc", href: `jersey/pl/afc` },
              { name: 'Chelsea', id:"cfc", href: `jersey/pl/cfc` },
            ],
          },
          {
            id: 'laliga',
            name: 'La Liga',
            items: [
              { name: 'Real Madrid', id:"fcrm", href: `jersey/laliga/fcrm` },
              { name: 'Barcelona', id:"fcb", href: `jersey/laliga/fcb` },
              { name: 'Atletico Madrid', id:"fcam", href: `jersey/laliga/fcam` }
            ],
          },
          {
            id: 'bundesliga',
            name: 'Bundesliga',
            items: [
              { name: 'Bayern Munich', id:"fcbm", href: `jersey/bundesliga/fcbm` },
              { name: 'Borussia Dortmund', id:"bvb", href: `jersey/bundesliga/bvb` },
              { name: 'Bayer Leverkusen', id:"bl", href: `jersey/bundesliga/bl` }
            ],
          },
          // {
          //   id: 'brands',
          //   name: 'Brands',
          //   items: [
          //     { name: 'Full Nelson', id: '#' },
          //     { name: 'My Way', id: '#' },
          //     { name: 'Re-Arranged', id: '#' },
          //     { name: 'Counterfeit', id: '#' },
          //     { name: 'Significant Other', id: '#' },
          //   ],
          // },
        ],
      },
      // {
      //   id: 'men',
      //   name: 'Men',
      //   featured: [
      //     {
      //       name: 'New Arrivals',
      //       id: '#',
      //       imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
      //       imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
      //     },
      //     {
      //       name: 'Artwork Tees',
      //       id: '#',
      //       imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
      //       imageAlt:
      //         'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
      //     },
      //   ],
      //   sections: [
      //     {
      //       id: 'clothing',
      //       name: 'Clothing',
      //       items: [
      //         { name: 'Mens Kurtas', id: 'mens_kurta' },
      //         { name: 'Shirt', id: 'shirt' },
      //         { name: 'Men Jeans', id: 'men_jeans' },
      //         { name: 'Sweaters', id: '#' },
      //         { name: 'T-Shirts', id: 't-shirt' },
      //         { name: 'Jackets', id: '#' },
      //         { name: 'Activewear', id: '#' },
              
      //       ],
      //     },
      //     {
      //       id: 'accessories',
      //       name: 'Accessories',
      //       items: [
      //         { name: 'Watches', id: '#' },
      //         { name: 'Wallets', id: '#' },
      //         { name: 'Bags', id: '#' },
      //         { name: 'Sunglasses', id: '#' },
      //         { name: 'Hats', id: '#' },
      //         { name: 'Belts', id: '#' },
      //       ],
      //     },
      //     {
      //       id: 'brands',
      //       name: 'Brands',
      //       items: [
      //         { name: 'Re-Arranged', id: '#' },
      //         { name: 'Counterfeit', id: '#' },
      //         { name: 'Full Nelson', id: '#' },
      //         { name: 'My Way', id: '#' },
      //       ],
      //     },
      //   ],
      // },
    ],
    pages: [
      { name: 'Company', id: '/' },
      { name: 'Stores', id: '/' },
    ],
  }