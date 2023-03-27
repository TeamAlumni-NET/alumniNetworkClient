import { useEffect, useState } from 'react'
import { Autocomplete, Button, InputLabel, TextField, createFilterOptions, Dialog } from "@mui/material"
import { strings } from "../../../utils/localization"
import { Box } from '@mui/system'
import { getGroupAsList } from '../../../reducers/groupsSlice'
import { getTopicAsList } from '../../../reducers/topicsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { postNewPost } from '../../../reducers/postSlice'
import snarkdown from 'snarkdown'
import CreateGroupTopic from '../../templateSites/groupTopicList/CreateGroupTopic'
import { createGroupTopic as createGroupTopicService } from '../../../services/group/groupsTopicsService'

const initialState = {
  title: "",
  content: "",
  topicId: null,
  groupId: null,
  targetUserId: null,
  parentPostId: null,
  eventId: null,
  userId: JSON.parse(localStorage.getItem("currentUser")).id
}

const CreatePostForm = (defaultdata, openDialog, setOpenDialog) => {
  const dispatch = useDispatch()
  const filter = createFilterOptions()
  const { groups } = useSelector(state => state.groupList)
  const { topics } = useSelector(state => state.topicList)
  const [showCreateNew, setShowCreateNew] = useState(false)
  const [type, setType] = useState("group")
  const [createNewGroupTopic, setCreateNewGroupTopic] = useState("")

  const [newPost, setNewPost] = useState(initialState)

  defaultdata.map(data => {
    console.log(data)
  })
  //Check if works... 
  /*
  if (defaultdata === "event") {
    setNewPost.eventId = id
  } else if (defaultdata === "group") {
    setNewPost.groupId = id
  } else if (defaultdata === "topic") {
    setNewPost.topicId = id
  } else if (defaultdata === "targetUser") {
    setNewPost.targetUserId = id
  } else if (defaultdata === "parentPost") {
    setNewPost.parentPostId = id
  }
  */

  useEffect(() => {
    dispatch(getGroupAsList())
    dispatch(getTopicAsList())
  }, [dispatch])

  const handleClose = () => {
    setOpenDialog(false)
    setCreateNewGroupTopic("")
    setNewPost(initialState)
  }

  const handleSubmit = async () => {
    if (createNewGroupTopic !== "") {
      const response = await createGroupTopicService(createNewGroupTopic, `${type}s`)
      if (type === "group") newPost.groupId = response.id
      else newPost.topicId = response.id
    }
    dispatch(postNewPost(newPost))
    handleClose()
  }

  /*test snarkdown
  let md = '_this_ is **easy** to `use`.';
  let html = snarkdown(md);
  console.log(html);
  */

  const autoCompleteRender = (completetype) => {
    const isDisabled = () => {
      if (completetype !== type) {
        if (createNewGroupTopic !== "") return true
        else if (completetype === "topic") {
          if (newPost.groupId !== null) return true
        } else {
          if (newPost.topicId !== null) return true
        }
        return false
      }
      return false
    }

    return (
      <Autocomplete
        disabled = {isDisabled()}
        sx={{ width: 300 }}
        options={completetype === "group" ? groups : topics}
        getOptionLabel={option => {
          if (typeof option === "string") return option
          if (option.inputValue) return option.inputValue
          if (option === null) return ""
          return option.name
        }}
        renderInput={(params) => <TextField {...params} label="" />}
        selectOnFocus
        clearOnBlur
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            setTimeout(() => {
              setType(completetype)
              setShowCreateNew(true)
              setCreateNewGroupTopic(newValue)
            })
          } else if (newValue && newValue.inputValue) {
            setType(completetype)
            setShowCreateNew(true)
            setCreateNewGroupTopic(newValue.inputValue)
          } else if (newValue === null) {
            setCreateNewGroupTopic("")
            setNewPost(newPost => ({
              ...newPost,
              topicId: null,
              groupId: null
            }))
          }
          else {
            if (completetype === "group") {
              setNewPost(newPost => ({
                ...newPost,
                groupId: newValue.id
              }))
            }
            else {
              setType("topic")
              setNewPost(newPost => ({
                ...newPost,
                topicId: newValue.id,
              }))
            }
          } 
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params)
          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              name: `add ${params.inputValue}`
            })
          }
          return filtered
        }}
        renderOption={(props, option) => <li{...props}>{option.name}</li>}
      />
    )
  }

  return (
    <Dialog 
      fullScreen
      open={openDialog}
      onClose={handleClose}
      //TransitionCompnent={Transition}
    >
      <form onSubmit={handleSubmit} style={{ padding: 20 }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
        }} >

          <h1>{strings.createPostForm.title}</h1>
          <div>
            <InputLabel variant='standard'>{strings.createPostForm.postTitle}</InputLabel>
            <TextField
              required
              id='outlined-required'
              defaultValue=""
              onChange={e => setNewPost(newPost => ({
                ...newPost,
                title: e.target.value,
              }))}
            />
          </div>

          <InputLabel id="group">{strings.createPostForm.group}</InputLabel>
          {autoCompleteRender("group")}
          <InputLabel id="topic">{strings.createPostForm.topic}</InputLabel>
          {autoCompleteRender("topic")}

          <div>
            <InputLabel variant='standard'>{strings.createPostForm.content}</InputLabel>
            <TextField
              required
              fullWidth
              multiline
              minRows={5}
              id='outlined-required'
              defaultValue=""
              onChange={e => setNewPost(newPost => ({
                ...newPost,
                content: e.target.value,
              }))}
            />
          </div>
        </Box>
        
        {showCreateNew &&
          <CreateGroupTopic
            type={type}
            showCreateNew={showCreateNew}
            setShowCreateNew={setShowCreateNew}
            createGroupTopic={createNewGroupTopic}
            setCreateGroupTopic={setCreateNewGroupTopic}
          />}

        <Button onClick={handleSubmit}>{strings.createPostForm.post}</Button>
      </form>
    </Dialog>
  )
}

export default CreatePostForm