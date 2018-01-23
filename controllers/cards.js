const knex = require( "../db/knex.js" );

module.exports = {
    // CHANGE ME TO AN ACTUAL FUNCTION
    index: function ( req, res ) {
        if ( !req.session.deck ) {
            req.session.deck = [];
        }

        knex( 'cards' ).then( ( cardsData ) => {
            res.render( 'cardsIndex', {
                cards: cardsData,
                deck: req.session.deck
            } );
        } )
    },

    addCard: function ( req, res ) {
        knex( 'cards' ).insert( {
            mana: req.body.mana,
            attack: req.body.attack,
            health: req.body.health,
            description: req.body.description
        } ).then( () => {
            res.redirect( '/' );
        } ).catch( () => {
            res.sendStatus( 500 )
        } )
    },

    add: function ( req, res ) {
        knex( ( 'cards' ) ).where( 'id', req.params.id ).then( ( cardData ) => {
            req.session.deck.push( cardData[ 0 ] )
            res.redirect( '/' );
        } )
    },

    remove: function ( req, res ) {
        console.log( req.session.deck.length, req.params.id );
        req.session.deck.splice( req.params.id, 1 )
        res.redirect( '/' );
    }

}