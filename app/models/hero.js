'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Hero Schema
 */
var HeroSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true,
        unique: true
    },
    matchups: [{
    	category: {
            type: String
        },
        enemy: {
            type: Schema.ObjectId,
            ref: 'Hero'
        },
        percent: {
            type: String
        }
    }]
});

mongoose.model('Hero', HeroSchema);