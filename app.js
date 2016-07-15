import Sequelize from 'sequelize';

const Connection = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql', // 'mysql' | 'sqlite' | 'postgres' | 'mariadb'
    host: 'localhost'
});

const Article = Connection.define('article', {
    slug: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        validate: {
            len: {
                args: [10, 150],
                msg: 'Please enter at title with at least 10 chars but no more than 150'
            }
        }
    },
    body: {
        type: Sequelize.TEXT,
        // defaultValue: 'Comming soon...'
        validate: {
            startsWithUpper: function(bodyVal){
                var first = bodyVal.charAt(0);
                var startsWithUpper = first === first.toUpperCase();
                if(!startsWithUpper){
                    throw new Error('First letter must be a uppercase letter.');
                } else {

                }
            }
        }
    },
    approved: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true, // true => create createdAt and updateAt columns
    hooks: {
        beforeValidate: function(){
            console.log('beforeValidate');
        },
        afterValidate: function(){
            console.log('afterValidate');
        },
        beforeCreate: function(){
            console.log('beforeCreate');
        },
        afterCreate: function(res){
            console.log('afterCreate: Created article with slug', res.dataValues.slug);
        }
    }
});

/*Connection.sync().then(() => {
    Article.create({
        title: 'title',
        body: 'content',
    }).then(()=>{

    });
});*/

Connection.sync({
    force: true, // Delete existing table and create new table
    logging: console.log
}).then(() => {

    // Create new row
    // return Article.create({
    //     title: 'adklajflaf',
    //     slug: 'wibble',
    //     body: 'Wabble'
    // });

    // Create new row with build and save functions.
    // Article.build({
    //     title: 'Some title',
    //      slug: 'Some slug',
    //     body: 'Some body'
    // }).save();

    // Find data from table
    // Article.findAll().then(articles=>{
    //     console.log(articles.length);
    // });
    //
    // Or
    //
    // Article.findById(1).then( article => {
    //     console.log(article.dataValues);
    // });

    // Create block data and insert to table.
    // The promise function helps to show data inserted
    var req = {
        body: {
            title: 'adklajflaf',
            slug: 'wibble',
            body: 'Wabble',
            approved: true
        }
    };

    Article.create(req.body, {
        fields: ['title', 'body']
    }).then((insertedArticle) => {
        console.log(insertedArticle.dataValues);
    });

}).catch(error => {
    console.log(error);
});
