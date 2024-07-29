import React, { useState} from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, CardActions, Button, Select, FormControl, InputLabel, MenuItem } from '@mui/material'; 
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const OrderButton = styled(Button)({
    backgroundColor: '#ff69b4',
    '&:hover': {
      backgroundColor: '#9b2226',
    },
    color: '#fff',
  });


const cakes =[
    {
        name: 'Cannoli Cupcake',
        price: 'LKR.250.00',
        image: '/Cannoli Cupcake.png',
        category: 'Individual Cupcake',
    },
    {
        name: 'Pink Vanilla',
        description: 'Vanilla bean cake topped with our signature pink vanilla buttercream and garnished with pink sugar.',
        price: 'LKR.280.00',
        image: '/pv.png',
        category: 'Individual Cupcake',
    },
    {
        name: 'Pink Chocolate',
        description: 'Chocolate cake topped with our signature pink vanilla buttercream and garnished with pink sugar.',
        price: 'LKR.280.00',
        image: '/pc.png',
        category: 'Individual Cupcake',
    },
    {
        name: 'Chocoholic',
        description: "A chocolate lover's favorite chocolate cake topped with chocolate buttercream frosting and garnished with chocolate shavings.",
        price: 'LKR.280.00',
        image: '/chocoCup.png',
        category: 'Individual Cupcake',
    },
    {
        name: 'Peanut Butter Cup',
        description: 'Chocolate cake topped with peanut butter, cream cheese buttercream and garnished with peanut butter cups, peanut butter, and fudge drizzle.',
        price: 'LKR.300.00',
        image: '/slide1.png',
        category: 'Individual Cupcake',
    },
    {
        name: 'Cookies & Cream',
        description: 'Chocolate cake topped with our signature cookie buttercream topped with chocolate cookie crumbles.',
        price: 'LKR.300.00',
        image: '/cc.png',
        category: 'Individual Cupcake',
    },
    {
        name: 'Famous Red Velvet',
        description: 'Our "Famous Red Velvet" cake is topped with cream cheese buttercream and garnished with red velvet crumbles.',
        price: 'LKR.300.00',
        image: '/redCup.png',
        category: 'Individual Cupcake',
    },
    {
        name: 'Lemon Drop',
        description: 'Lemon cake filled with lemon curd, topped with lemon buttercream, and garnished with lemon curd.',
        price: 'LKR.300.00',
        image: 'l.png',
        category: 'Individual Cupcake',
    },
    {
        name: 'Build Your Own Box',
        description: '2 Cupcakes (2 Flavors) LKR.550.00 | 4 Cupcakes (4 Flavors) LKR.1000 | 6 Cupcakes (6 Flavors) LKR.1800.00 | 12 Cupcakes (12 Flavors) LKR.3500.00 • Flavors: Pink Vanilla | Pink Chocolate | Chocoholic | Vanilla N Chocolate | Cookies-N-Cream | Lemon Drop | Famous Red Velvet | Wedding Cake | Hot Fudge Sundae | Peanut Butter Cup | Chocolate Cream | Birthday Cake',
        price: 'LKR.550.00+',
        image: 'box.png',
        category: 'Build Your Own Box',
    },
    {
        name: 'Mini Dozen',
        description: 'Regular LKR.900.00 | Gluten-free LKR.1100.00 | Vegan LKR.1600.00 • Box of 12 mini cupcakes.',
        price: 'LKR.900.00+',
        image: 'Mini Dozen.png',
        category: 'Mini Cupcakes',
    },
    {
        name: 'Dusty Blush',
        description: '5 inches LKR.3600.00 | 6 inches LKR.4500.00 | 7 inches LKR.6000.00 | 8 inches LKR.8000.00 | 9 inches LKR.11000.00 • Simply elegant, Dusty Blush pink cake, 3 layers tall. Layered strokes of buttercream. Cream-colored, fresh roses and macarons on top. Can be color-customized.',
        price: 'LKR.3600.00+',
        image: 'Dusty Blush.png',
        category: 'Birthday',
    },
    {
        name: 'Peanut Butter Drip Cake',
        description: "5 inches LKR.3900.00 | 6 inches LKR.4800.00 | 7 inches LKR.6000.00 | 8 inches LKR.9000.00 | 9 inches LKR.10000.00 • If you love chocolate and peanut butter, then you'll love this cake. Layers of chocolate cake, filled with peanut butter buttercream. Topped with a chocolate and peanut butter drip and peanut butter cups.",
        price: 'LKR.3900.00+',
        image: 'pb.png',
        category: 'Birthday',
    },
    {
        name: 'Red Velvet Cake',
        description: "5 inches LKR.3900.00 | 6 inches LKR.4800.00 | 7 inches LKR.6000.00 | 8 inches LKR.9000.00 | 9 inches LKR.10000.00 • Our customers’ all-time favorite. Deep red velvet cake with a light taste of chocolate, and cream cheese filling. Topped with cream cheese buttercream frosting and red velvet crumbs. These cakes contain 2 layers.",
        price: 'LKR.3900.00+',
        image: 'redCake.png',
        category: 'Birthday',
    },
    {
        name: 'Chocoholic Cake',
        description: "5 inches LKR.3900.00 | 6 inches LKR.4800.00 | 7 inches LKR.6000.00 | 8 inches LKR.9000.00 | 9 inches LKR.10000.00 • The ultimate chocolate lover’s cake, moist layers of chocolate devil’s food, iced with our decadent chocolate buttercream frosting. It will be topped with tasty chocolate shavings.",
        price: 'LKR.3900.00+',
        image: 'ChocoCake.jpg',
        category: 'Birthday',
    },
    {
        name: 'Sprinkle Birthday Cake',
        description: "5 inches LKR.3900.00 | 6 inches LKR.4800.00 | 7 inches LKR.6000.00 | 8 inches LKR.9000.00 | 9 inches LKR.10000.00 • Our most popular vanilla cupcake turned into a birthday cake. Vanilla cake filled with vanilla buttercream and rolled in rainbow nonpareils. Little vanilla clouds of buttercream on top.",
        price: 'LKR.3900.00+',
        image: 'b.png',
        category: 'Birthday',
    },
    {
        name: 'Slutty Brownie Cake',
        description: "5 inches LKR.3900.00 | 6 inches LKR.4800.00 | 7 inches LKR.6000.00 | 8 inches LKR.9000.00 | 9 inches LKR.10000.00 •  Slutty Brownie cake is a combination of three favorite desserts. 1st layer is gooey chocolate chip cookie dough. 2nd layer is double stuffed Oreos. 3rd layer is warm, fudgy chocolate cake. Chocolate drip, more cookies, and brownies on top.",
        price: 'LKR.3900.00+',
        image: 'sb.png',
        category: 'Birthday',
    },
    {
        name: 'Fruit Tartlet Cake',
        description: "5 inches LKR.2500.00 | 6 inches LKR.3600.00 | 7 inches LKR.4500.00 | 8 inches LKR.6000.00 | 9 inches LKR.7100.00 • Vanilla cake with a Bavarian cream filling. Topped with fresh berries and a naked finish",
        price: 'LKR.2500.00+',
        image: 'f.png',
        category: 'Birthday',
    },
    {
        name: 'Unicorn Cake',
        description: "5 inches LKR.3600.00 | 6 inches LKR.4500.00 | 7 inches LKR.6000.00 | 8 inches LKR.8000.00 | 9 inches LKR.11000.00 • Soar over pastel rainbows into a world of wonder with our irresistible Unicorn Rainbow Cake. Colorful moist layers of rainbow vanilla cake, smooth vanilla buttercream and fondant decorations create a magical cake as enchanting as it is edible. Baked fresh to order from the finest ingredients for flavor beyond belief.",
        price: 'LKR.3600.00+',
        image: 'u.png',
        category: 'Birthday',
    },
    {
        name: 'Rainbow Candy Cake',
        description: "5 inches LKR.3600.00 | 6 inches LKR.4500.00 | 7 inches LKR.6000.00 | 8 inches LKR.8000.00 | 9 inches LKR.11000.00 • If you thought we couldn’t possibly surpass the magic of our Rainbow Cake, our brightest bake just got even more colorful. Every slice of this supercharged Rainbow Frosting Cake is a technicolor journey of deliciousness thanks to layers of freshly baked rainbow-colored vanilla cake wrapped in rainbow frosting. Add a name on the front for extra magic. Colorful lollipops and skittles waterfalls too. Our Rainbow Cakes contain 4 layers of cake.",
        price: 'LKR.3600.00+',
        image: 'rb.png',
        category: 'Birthday',
    },
    {
        name: 'Rustic Birch Tree Wedding Cake',
        description: "For each layer: 5 inches (5-6 Servings) LKR.3500.00 | 6 inches (8 Servings) KLR.3800.00 | 7 inches (10 Servings) LKR.4500.00 | 8 inches (12-15 Servings) LKR.7000.00 | 9 inches (15-20 Servings) LKR.8700.00 | 10 inches (22-28 Servings) $10000.00 • Rustic Birch Tree wedding cake with couple's initials. Florals and toppers of your choice can be added at an additional cost.",
        price: 'LKR.3500.00+',
        image: 'w1.png',
        category: 'Wedding',
    },
    {
        name: 'Naked Wedding Cake',
        description: "For each layer: 5 inches (5-6 Servings) LKR.3500.00 | 6 inches (8 Servings) KLR.3800.00 | 7 inches (10 Servings) LKR.4500.00 | 8 inches (12-15 Servings) LKR.7000.00 | 9 inches (15-20 Servings) LKR.8700.00 | 10 inches (22-28 Servings) $10000.00 • Layers of light cake frosted with a rustic, textured finish.",
        price: 'LKR.3500.00+',
        image: 'w2.png',
        category: 'Wedding',
    },
    {
        name: 'Naked Cake with Fresh Berries',
        description: "For each layer: 5 inches (5-6 Servings) LKR.3500.00 | 6 inches (8 Servings) KLR.3800.00 | 7 inches (10 Servings) LKR.4500.00 | 8 inches (12-15 Servings) LKR.7000.00 | 9 inches (15-20 Servings) LKR.8700.00 | 10 inches (22-28 Servings) $10000.00 • Semi-naked cake with your choice of cake flavor, with fresh berries and baby's breath.",
        price: 'LKR.3500.00+',
        image: 'w3.png',
        category: 'Wedding',
    },
    {
        name: 'Rustic Wedding Cake',
        description: "For each layer: 5 inches (5-6 Servings) LKR.3500.00 | 6 inches (8 Servings) KLR.3800.00 | 7 inches (10 Servings) LKR.4500.00 | 8 inches (12-15 Servings) LKR.7000.00 | 9 inches (15-20 Servings) LKR.8700.00 | 10 inches (22-28 Servings) $10000.00 •  Your choice of flavors. Florals and toppers are extra.",
        price: 'LKR.3500.00+',
        image: 'w4.png',
        category: 'Wedding',
    },
    {
        name: 'Strawberry Dream Bar',
        price: 'LKR.2500.00+',
        image: 'c1.png',
        category: 'Cheesecakes',
    },
    {
        name: 'White Chocolate Raspberry Cheesecake',
        description:"The most delicious raspberry cheesecake ever. My rich and creamy white chocolate raspberry cheesecake is what dessert dreams are made of. This velvety cheesecake is made with a simple Graham Cracker crust and a creamy white chocolate cheesecake batter dotted with whole raspberries.",
        price: 'LKR.2500.00+',
        image: 'c2.png',
        category: 'Cheesecakes',
    },
    {
        name: 'S&S Cheesecake',
        description:"Smooth cheesecake made with a layer of chocolate and marshmallows on the bottom and topped with hot fudge sauce and toasted marshmallows.",
        price: 'LKR.3000.00+',
        image: 'c3.png',
        category: 'Cheesecakes',
    },
    {
        name: "Reese's Peanut Butter Cheesecake",
        description:"This truly decadent Reese's peanut butter cup cheesecake combines a buttery, Oreo cookie crust with a peanut butter cheesecake filling that's mixed with chopped pieces of miniature Reese's peanut butter cups. It's the perfect dessert to share with those who love cheesecake or a really good chocolate-peanut butter treat.",
        price: 'LKR.3000.00+',
        image: 'c4.png',
        category: 'Cheesecakes',
    },
];

const categories = [
    'Individual Cupcake',
    'Build Your Own Box',
    'Mini Cupcakes',
    'Birthday',
    'Wedding',
    'Cheesecakes',
];

const priceRanges = [
    {label: 'All', value: ''},
    {label: 'LKR.0 - LKR.500', value: [0,500]},
    {label: 'LKR.500 - LKR.1000', value: [500,1000]},
    {label: 'LKR.1000 - LKR.2000', value: [1000,2000]},
    {label: 'LKR:2000 - LKR.5000', value: [2000,5000]},
    {label: 'LKR.5000+', value: [5000,Infinity]},
];


const Menu = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');

    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handlePriceRangeChange = (event) => {
        setSelectedPriceRange(event.target.value);
    };

    const filteredCakes = cakes.filter((cake) => {
        const categoryMatch = selectedCategory ? cake.category === selectedCategory : true;
        const priceMatch = selectedPriceRange
            ?(parseFloat(cake.price.replace('LKR.','').replace('+','')) >= selectedPriceRange[0] &&
            parseFloat(cake.price.replace('LKR.','').replace('+','')) <= selectedPriceRange[1])
            : true;
        return categoryMatch && priceMatch;
    })
    .sort((a, b) => {
        const priceA = parseFloat(a.price.replace('LKR.','').replace('+','').trim());
        const priceB = parseFloat(b.price.replace('LKR.','').replace('+','').trim());
        return priceA - priceB;
    });

    return (
        <div>
            <Container sx={{ mt: '120px' }}>
                <Typography variant="h3" component="h1" gutterBottom textAlign="center">
                    Our Menu
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Category</InputLabel>
                        <Select value={selectedCategory} onChange={handleChange}>
                            <MenuItem value=""><em>All</em></MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel>Price Range</InputLabel>
                        <Select value={selectedPriceRange} onChange={handlePriceRangeChange}>
                            {priceRanges.map((range) => (
                                <MenuItem key={range.label} value={range.value}>{range.label}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Grid container spacing={3}>
                    {categories.map((category) => (
                        (selectedCategory === '' || selectedCategory === category) && (
                        <Grid item xs={12} key={category}>
                            <Box sx={{ mb: 4, border: '2px solid', borderColor: '#ff69b4', borderRadius: '8px', p: 2, boxShadow: '0 0 10px #ff69b4' }}>
                                <Typography variant="h4" component="h2" gutterBottom textAlign="center" sx={{ textTransform: 'uppercase' }}>
                                    {category}
                                </Typography>
                                {category === 'Build Your Own Box' && (
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body1">
                                            Customize your own box with your favorite flavors. Perfect for any occasion and made with the finest ingredients.
                                        </Typography>
                                    </Box>
                                )}
                                <Grid container spacing={3}>
                                    {filteredCakes
                                        .filter((cake) => cake.category === category)
                                        .map((cake, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Card sx={{ height: '100%' }}>
                                                    <CardMedia component="img" height="350" image={cake.image} alt={cake.name} sx={{ objectFit: 'cover' }} />
                                                    <CardContent>
                                                        <Typography variant="h5" component="h2">{cake.name}</Typography>
                                                        <Typography variant="body2" color="textSecondary">{cake.description}</Typography>
                                                        <Typography variant="h6" component="div">{cake.price}</Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <OrderButton size="small" component={Link} to="/order">
                                                            Order Now
                                                        </OrderButton>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))}
                                </Grid>
                            </Box>
                        </Grid>
                        )
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Menu;