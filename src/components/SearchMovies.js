import React,{useRef}  from "react";
import { useDispatch } from "react-redux";
import { updateSearch } from "../store/MovieSlice";
function SearchInput() {
    const dispatch = useDispatch();
    const searchInputRef = useRef();
    // const searchOnChangeHandle = (e) => {
    //     console.log('search test:: ', e.target.value);
    // }
    const searchBtnOnClickHandle = (e) => {
        // console.log('search test:: ', searchInputRef?.current?.value);
        dispatch(updateSearch(searchInputRef?.current?.value));
    }
    return <div>
        <input id='inputSearch' ref={searchInputRef}/>
        <button onClick={searchBtnOnClickHandle}>Search</button>
    </div>
}

export default SearchInput;
