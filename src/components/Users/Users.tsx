import React, { useEffect } from "react";
import s from "./Users.module.css";
import {
  createSearchParams,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Paginator from "../common/Paginator/Paginator";
import UserFormSearch from "./UserFormSearch";
import {
  FilterType,
  followThunkCreator,
  getUserThunkCreator,
  unfollowThunkCreator,
} from "../../redux/usersReducer";
import { useSelector } from "react-redux";
import {
  getTotalCount,
  getPageSize,
  getCurrentPage,
  getUsers,
  getFilter,
  getFollowingInProgress,
} from "../../redux/userSelectors";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/reduxStore";

const userAva = require("../images/image2.png");

type Props = {};

const Users: React.FC<Props> = () => {
  const totalItemsCount = useSelector(getTotalCount);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const users = useSelector(getUsers);
  const filter = useSelector(getFilter);
  const followingInProgress = useSelector(getFollowingInProgress);
  const dispatch: AppDispatch = useDispatch();

  const useNavigateSearch = () => {
    const navigate = useNavigate();
    //@ts-ignore
    return (pathname, params) =>
      navigate(`${pathname}?${createSearchParams(params)}`);
  };

  const navigateSearch = useNavigateSearch();
  const location = useLocation();
  useEffect(() => {
 
    navigateSearch("/users", {
      page: `${currentPage}`,
      count: `${pageSize}`,
      term: `${filter.term}`,
      friend: `${filter.friend}`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, currentPage, pageSize]);

  //@ts-ignore
  useEffect(() => {
    const query = new URLSearchParams(location.search);

    let actualPage = currentPage;
    let actualFilter = filter;

    const queryFriend = query.get("friend");
    const queryPage = query.get("page");
    const queryTerm = query.get("term");

    if (queryPage) actualPage = +queryPage;

    //@ts-ignore
    if (queryTerm)
      //@ts-ignore
      actualFilter = { ...actualFilter, term: queryTerm };

    switch (queryFriend) {
      case "null":
        //@ts-ignore
        actualFilter = { ...actualFilter, friend: "" };

        break;
      case "true":
        //@ts-ignore
        actualFilter = { ...actualFilter, friend: true };
        break;
      case "false":
        //@ts-ignore
        actualFilter = { ...actualFilter, friend: false };
        break;

      default:
        break;
    }
    dispatch(getUserThunkCreator(actualPage, pageSize, actualFilter));
  }, [location.search]);

  //   useEffect(() => {
  //     dispatch(getUserThunkCreator(currentPage, pageSize, filter));
  //   }, []);

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUserThunkCreator(pageNumber, pageSize, filter));
  };
  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUserThunkCreator(1, pageSize, filter));
  };
  const follow = (id: number) => {
    dispatch(followThunkCreator(id));
  };
  const unfollow = (id: number) => {
    dispatch(unfollowThunkCreator(id));
  };

  return (
    <div>
      {/* <button onClick={goToPosts}> click me </button> */}
      <UserFormSearch onFilterChanged={onFilterChanged} />
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
      />

      {users.map((item) => (
        <div key={item.id}>
          <div className={s.wrapper}>
            <div className={s.item__wrapper}>
              <div className={s.item__image}>
                <Link to={`/profile/` + item.id}>
                  <div className={s.item__img}>
                    <img
                      src={
                        item.photos.small != null ? item.photos.small : userAva
                      }
                      alt="userAva"
                    />
                  </div>
                </Link>
                <div className={s.item__button}>
                  {item.followed ? (
                    <button
                      disabled={followingInProgress.some(
                        (id) => id === item.id
                      )}
                      onClick={() => {
                        unfollow(item.id);
                      }}
                    >
                      unfollow
                    </button>
                  ) : (
                    <button
                      disabled={followingInProgress.some(
                        (id) => id === item.id
                      )}
                      onClick={() => {
                        follow(item.id);
                      }}
                    >
                      follow
                    </button>
                  )}
                </div>
              </div>
              <div className={s.item__message}>
                <div className={s.item__message_flex}>
                  <div className={s.item__author}>{item.name}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;

{
  /* <button disabled={props.followingInProgress.some(id => id === item.id)} onClick={() => {
    //we pick up an id by pushing the button, then some method returns true, because the id is already here
    // so it will be disabled=={true}
    // disabled becomes true only when we pick an id, that allow only the pushed button became disabled

 */
}
