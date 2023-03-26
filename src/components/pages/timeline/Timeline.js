import { getPostByTimeline } from "../../../services/post/postService";
import DetailsList from "../../templateSites/detailList/DetailsList";
import { strings } from "../../../utils/localization";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPostsAsList } from "../../../reducers/postsSlice";
import { getTimelineEventsList } from "../../../reducers/eventsSlice";

const Timeline = () => {
  const dispatch = useDispatch();
  const stringList = {
    title: strings.timeline.title,
    createNew: strings.timeline.createNew,
    search: strings.common.search,
    group: strings.timeline.group,
    topic: strings.timeline.topic,
    startingAt: strings.timeline.startingAt,
  };
  const { postsTimeline } = useSelector((state) => state.postsList);
  const { timelineEvents } = useSelector((state) => state.eventList);
  const timeline = postsTimeline.concat(timelineEvents);

  useEffect(() => {
    dispatch(getPostsAsList());
    dispatch(getTimelineEventsList());
  }, [dispatch]);

  useEffect(() => {
    timeline
      .sort((a, b) => new Date(a.timeStamp) - new Date(b.timeStamp))
      .reverse();
  }, [postsTimeline, timelineEvents]);

  return (
    <>
      <DetailsList stringList={stringList} data={timeline} timeline={true} />
    </>
  );
};

export default Timeline;
