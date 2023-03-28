import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  Typography,
} from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"
import { Box } from "@mui/system"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { strings } from "../../../utils/localization"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"
import { useDispatch } from "react-redux"
import { saveNavigate } from "../../../reducers/currentPageSlice"

const EventCard = ({ post, url, time, childPost, search, stringList }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const getTopicOrGroupText = () => {
    let topicsOrGroups =
      post.group.length > 0 ? strings.group.groups : strings.topic.topics

    if (topicsOrGroups === strings.group.groups) {
      post.group.forEach((element) => {
        topicsOrGroups += element
      })
    } else {
      post.topic.forEach((element) => {
        topicsOrGroups += element
      })
    }

    return topicsOrGroups
  }
  return (
    <>
      <Card
        sx={{
          background: "aliceblue",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{ ml: "15px", mr: "15px", display: "flex", alignItems: "center" }}
        >
          <CalendarMonthIcon /> Event
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignSelf: "start",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <CardHeader title={post.name} subheader={getTopicOrGroupText()} />
            <Divider />
            <CardHeader
              avatar={<AccessTimeIcon />}
              title={strings.common.start + ":"}
              subheader={time}
              onClick={() => {
                dispatch(saveNavigate({url: post.user.name, id: post.user.id}))
                navigate(`/profile/${post.user.name.replace(/\s/g, "_")}`)
              }}
            ></CardHeader>
          </Box>
          <CardActions mr={"10px"}>
            <IconButton
              onClick={() => {
                dispatch(saveNavigate({url: post.name, id: post.id}))
                navigate(`../post/${post.name.replace(/\s/g, "_")}`, { replace: true })
              }}
            >
              <NavigateNextIcon />
            </IconButton>
          </CardActions>
        </Box>
      </Card>
      {search !== "" &&
        post.childPosts.length > 0 &&
        childPost(post.childPosts)}
    </>
  )
}

export default EventCard
