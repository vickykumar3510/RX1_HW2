import React from "react";
import { createStore } from 'redux'
import profileReducer from "./profileReducer";
import { addProfile, removeProfile, calculateAverageAge } from "./profileActions";
import { profiles } from "./profiles";

const store = createStore(profileReducer)

const inputId = document.querySelector('#inputId')
const inputName = document.querySelector('#inputName')
const inputAge = document.querySelector('#inputAge')
const addProfileBtn = document.querySelector('#addProfileBtn')

const profileId = document.querySelector('#profileId')
const removeProfileBtn = document.querySelector('#removeProfileBtn')

const displayProfile = document.querySelector('#displayProfile')
const displayAverageAge = document.querySelector('#displayAverageAge')


store.subscribe(() => {
    renderProfile()
})

const addProfileHandler = () => {
    const idValue = inputId.value
    const nameValue = inputName.value
    const ageValue = inputAge.value

    if(idValue && nameValue && ageValue){
        store.dispatch(addProfile({id: Number(idValue), name: nameValue, age: Number(ageValue)}))
        store.dispatch(calculateAverageAge())
    }

}

addProfileBtn.addEventListener('click', addProfileHandler)


const renderProfile = () => {
    displayProfile.innerHTML = ''

    const state = store.getState()

    state.addedProfile.forEach((p) => {
        const li = document.createElement('li')
        li.textContent = `${p.id}. ${p.name} (${p.age} years old)`
        displayProfile.appendChild(li)

    })
      displayAverageAge.textContent = `Average age: ${state.averageAge}`
}

renderProfile()


const removeProfileHandler = () => {
    const profileID = profileId.value

    if(profileID){
        store.dispatch(removeProfile({ id: Number(profileID)}))
        store.dispatch(calculateAverageAge())
    }

}
removeProfileBtn.addEventListener('click', removeProfileHandler)