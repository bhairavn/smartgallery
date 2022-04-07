import React, { Component } from 'react'

const gallery=(state,{type,payload})=>{


    switch (type){
        case 'DISPLAY_GALLERY':
            return state;

        default:
            return state
    }

    }

export default gallery;