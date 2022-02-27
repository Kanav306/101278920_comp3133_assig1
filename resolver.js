const User = require('../db/user.js')
const Listing = require('../db/listing.js')
const Booking = require('../db/booking.js')

const resolvers = {
    Query: {
        getListings: async (parents, args) => {
            return await Listing.find({})
        },

        getListingsByCity: async (parents, args) => {
            return await Listing.find({ city: args.city })
        },
        getListingsByPosCode: async (parents, args) => {
            return await Listing.find({ postal_code: { $regex: args.postal_code, $options: 'i' } })
        },
        getBookingsByUser: async (parents, args) => {
       
            return await Booking.find({ username: userFind.username })
        },
        getListingsByAdmin: async (parents, args) => {
            if (!args.userId) {
                return
            }

            const userFind = await User.findById(args.userId)
            return await Listing.find({ username: userFind.username })
        }
    },

    Mutation: {

        addUser: async (parent, args) => {

            let User = new User({
                username: args.username,
                firstname: args.firstname,
                lastname: args.lastname,
                password: args.password,
                email: args.email,
                type: args.type
            })

            return await User.save()
        },

        login: async (parent, args) => {
            const userFind = await User.findOne({username: args.username})

            return userFind._id
        },

        addListing: async (parent, args) => {

            
            if (!args.userId) {
                return
            }

            const userFind = await User.findById(args.userId)

           
            if (!userFind) {
                return
            }

            
            if (userFind.type != 'admin') {
                return
            }

            let Listing = new Listing({
                listing_id: args.listing_id,
                listing_title: args.listing_title,
                description: args.description,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: userFind.email,
                username: userFind.username
            })

            return await Listing.save()
        },

        addBooking: async (parent, args) => {

    
            let tempBooking = new Booking({
                listing_id: args.listing_id,
                booking_id: args.booking_id,
                booking_date: new Date().toString(),
                booking_start: new Date(args.booking_start).toString(),
                booking_end: new Date(args.booking_end).toString(),
                username: userFind.username
            })

            return await tempBooking.save()
        }
    }
}

module.exports = resolvers