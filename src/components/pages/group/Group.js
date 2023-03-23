import { Container } from "@mui/system"
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DetailsList from "../../templateSites/detailList/DetailsList"
import { useParams } from "react-router-dom"
import { getGroupPostsList } from "../../../reducers/postsSlice"
import { strings } from "../../../utils/localization"
import { getGroupTopicList } from "../../../services/group/groupsTopicsService"

const Group = () => {
  const { name, id } = useParams()
  const dispatch = useDispatch()
  const { postsGroup } = useSelector((state) => state.postsList)

  const stringList = {
    title: " " + strings.group.title,
    createNew: strings.group.createNew,
    search: strings.common.search,
    group: strings.group.group,
  }
  useEffect(() => {
    dispatch(getGroupPostsList(id))
  }, [dispatch])
  
  return (
    <Container>
      <DetailsList stringList={stringList} data={postsGroup} timeline={false} />
    </Container>
  )
}

export default Group
