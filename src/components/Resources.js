import React from "react";
import { EditGuesser, ListGuesser, Resource, ShowGuesser } from "react-admin";
import useFront from "../api/useFront";

const Resources = ()=>{
    console.log('here')
    const {data: resources } = useFront('resources');
    console.log(resources)
    return (
        <>
            some item
        </>
    )
}

export default Resources