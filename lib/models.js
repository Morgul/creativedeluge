//----------------------------------------------------------------------------------------------------------------------
// Models for Creative Deluge
//
// @module models.js
//----------------------------------------------------------------------------------------------------------------------

var db = require('omega-wf').db;

//----------------------------------------------------------------------------------------------------------------------

var User = db.define('User', {
	name: db.String(),
	email: db.String({ validate: {isEmail: true} })
},
{
	displayField: 'email',
	group: 'System'
});

var Article = db.define('Article', {
    title: db.String({ allowNull: false }),
    slug: db.Slug({ allowNull: false, unique: true, field: 'title' }),
    stinger: db.String(),
    content: db.Text(),
    isBlog: db.Boolean({ default: true }),
    isFeatured: db.Boolean({ default: false }),
    isDraft: db.Boolean({ default: false })
},
{
    displayField: 'title',
    group: 'Deluge'
});

var Image = db.define('Image', {
        name: db.String(),
        image: db.Image({ allowNull: false }),
        title: db.String(),
        caption: db.Text(),
        isPrimary: db.Boolean({ allowNull: false, default: false })
},
{
    group: 'Deluge'
});

// Associations

Article.hasMany(Image);
Article.belongsTo(User);

Image.hasOne(Article);

//----------------------------------------------------------------------------------------------------------------------