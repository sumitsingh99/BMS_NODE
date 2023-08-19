const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('BMS_NodeJS', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
});

const BaseModel = sequelize.define('BaseModel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false,
    },
    created_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    updated_by: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: 'base_models',
    timestamps: false,
});

const City = sequelize.define('City', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

}, {
    tableName: 'cities',
    timestamps : true,
    createdAt : 'created_at',
    updatedAt : 'updated_at'
});

const Theatre = sequelize.define('Theatre', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'theatres',
    timestamps: false,
});

City.hasMany(Theatre, { foreignKey: 'city_theater' });
Theatre.belongsTo(City, { foreignKey: 'city_theater' });

const Movie = sequelize.define('Movie', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    release_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    movie_features: {
        type: DataTypes.ENUM('2D' ,'3D' , 'Dolby' , '4D'),
        allowNull: false,
    },
    language: {
        type: DataTypes.ENUM('ENGLISH' , "HINDI" , 'MARATHI' , 'TELUGU' , 'KANNADA'),
        allowNull: false,
    },
}, {
    tableName: 'movies',
    timestamps: false,
});

const Actor = sequelize.define('Actor', {
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'actors',
    timestamps: false,
});

const Seat = sequelize.define('Seat', {
    seat_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    row: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    column: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    seat_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    seat_status: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'seats',
    timestamps: false,
});

const Auditorium = sequelize.define('Auditorium', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    auditoriumFeatures: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

const Show = sequelize.define('Show', {
    startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    showFeatures: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const ShowSeat = sequelize.define('ShowSeat', {
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

const Payment = sequelize.define('Payment', {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timeStamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    transactionNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentStatus: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId:{
        type: DataTypes.INTEGER,
        defaultValue: null
    }
});

const Ticket = sequelize.define('Ticket', {
    totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    timeOfBooking: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    seatId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }

});

// Associations
Auditorium.belongsTo(Theatre);
Theatre.hasMany(Auditorium);

Show.belongsTo(Movie);
Movie.hasMany(Show);

Show.belongsTo(Auditorium);
Auditorium.hasMany(Show);

ShowSeat.belongsTo(Seat);
Seat.hasMany(ShowSeat);

ShowSeat.belongsTo(Show);
Show.hasMany(ShowSeat);

Ticket.belongsTo(Show);
Show.hasMany(Ticket);

Ticket.belongsTo(User);
User.hasMany(Ticket);

Ticket.belongsTo(Payment);
Payment.hasOne(Ticket);

Ticket.belongsTo(Seat);
Seat.hasOne(Ticket);

Movie.belongsTo(City);
City.hasMany(Movie);

Movie.belongsTo(Theatre);
Theatre.hasMany(Movie);


// Sync the models with the database
sequelize.sync({ force: false })
    .then(() => {
        console.log('Database and tables synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

// Export the models
module.exports = {
    Seat,
    Actor,
    Movie,
    Theatre,
    City,
    Auditorium,
    Show,
    ShowSeat,
    User,
    Payment,
    Ticket,
};

