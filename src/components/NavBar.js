import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { Button, MenuItem, Select } from "@mui/material"
import { strings } from "../utils/localization"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../reducers/authenticationSlice"

const NabBar = ({keycloak, language, changeLanguageHandler}) => {
  const dispatch = useDispatch()
  const {username} = useSelector((state) => state.username)

  const logoutHandler = () => {
    dispatch(logout())
  }
  //keycloak.login()

  return (
    <div>
      <Select value={language} onChange={(e) => changeLanguageHandler(e.target.value)}>
        <MenuItem value={"en"}>En</MenuItem>
        <MenuItem value={"fi"}>Fi</MenuItem>
      </Select>
      <section className="actions">
        {!username ? 
          <Button onClick={() => {}}>{strings.navbar.login}</Button>
          : <NavLink to={"/"}>
            <Button onClick={() => logoutHandler()}>{strings.navbar.logout}</Button>
          </NavLink>}
      </section>
    </div>
  )
}

export default NabBar