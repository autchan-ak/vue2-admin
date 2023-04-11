import { getTheme, setTheme } from "@/utils/theme";

const Theme = parseInt(getTheme()) || 0;

const themeColor = [
    {
        aside: "background-image: linear-gradient(#001529, #001529);",
        header: "background-image: linear-gradient(to right,#ffffff, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#ffffff,#ffffff);",
    },
    {
        aside: "background-image: linear-gradient(#00BCFF, #00BCFF);",
        header: "background-image: linear-gradient(to right,#D2F2F1, #D2F2F1);",
        container:
            "background-image: linear-gradient(to bottom right,#D2F2F1,#D2F2F1);",
    },
    {
        aside: "background-image: linear-gradient(#9E25B0, #9E25B0);",
        header: "background-image: linear-gradient(to right,#EBD4F1, #EBD4F1);",
        container:
            "background-image: linear-gradient(to bottom right,#EBD4F1,#EBD4F1);",
    },
    {
        aside: "background-image: linear-gradient(#E13998, #E13998);",
        header: "background-image: linear-gradient(to right,#F9D6E9, #F9D6E9);",
        container:
            "background-image: linear-gradient(to bottom right,#F9D6E9,#F9D6E9);",
    },
    {
        aside: "background-image: linear-gradient(#E54E43, #E54E43);",
        header: "background-image: linear-gradient(to right,#FBD3D0, #FBD3D0);",
        container:
            "background-image: linear-gradient(to bottom right,#FBD3D0,#FBD3D0);",
    },
    {
        aside: "background-image: linear-gradient(#E13998, #F0F0F0);",
        header: "background-image: linear-gradient(to right,#EDC6DC, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#E13998,#F0F0F0);",
    },
    {
        aside: "background-image: linear-gradient(#F2791C, #F0F0F0);",
        header: "background-image: linear-gradient(to right,#F0D9C8, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#F2791C,#F0F0F0);",
    },

    {
        aside: "background-image: linear-gradient(#FABC07, #F0F0F0);",
        header: "background-image: linear-gradient(to right,#F2E8CA, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#FABC07,#F0F0F0);",
    },

    {
        aside: "background-image: linear-gradient(#9F23B2, #F0F0F0);",
        header: "background-image: linear-gradient(to right,#E1C9E4, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#9F23B2,#F0F0F0);",
    },
    {
        aside: "background-image: linear-gradient(#1BBCB4, #8CC63E);",
        header:
            "background-image: linear-gradient(to right,#ffffff,#1BBCB4, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#1BBCB4,#8CC63E);",
    },
    {
        aside: "background-image: linear-gradient(#E44D42, #FBBD08);",
        header:
            "background-image: linear-gradient(to right,#ffffff,#F37A1D, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#F37A1D, #FBBD08);",
    },
    {
        aside: "background-image: linear-gradient(#1AB8B8, #6F36B4);",
        header:
            "background-image: linear-gradient(to right,#ffffff,#1AB8B8, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#1AB8B8, #6F36B4);",
    },
    {
        aside: "background-image: linear-gradient(#EE2521, #FC8B02);",
        header:
            "background-image: linear-gradient(to right,#ffffff,#EE2521, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#EE2521, #FC8B02);",
    },
    {
        aside: "background-image: linear-gradient(#6D35B3, #E6058F);",
        header:
            "background-image: linear-gradient(to right,#ffffff,#6D35B3, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#6D35B3, #E6058F);",
    },
    {
        aside: "background-image: linear-gradient(#F83FBD, #CE1DFC);",
        header:
            "background-image: linear-gradient(to right,#ffffff,#F83FBE, #ffffff);",
        container:
            "background-image: linear-gradient(to bottom right,#F83FBD, #CE1DFC);",
    },
];

const greetings = [
    ["祝您新的一天工作愉快","","","","","",""],
    ["在忙也别忘了喝水","要来杯下午茶吗？","","","","",""],
    ["早点休息哦","","","","","",""],
]

export default {
    namespaced: true,
    state: {
        leave:false,
        themeColor,
        greetings,
        themeIndex: Theme,
        showSidebar: true,
    },
    mutations: {
        SET_THEME_INDEX(state, v) {
            state.themeIndex = v
            setTheme(v)
        },
        SET_SHOW_SIDEBAR(state, v) {
            state.showSidebar = v
        },
        SET_LEAVE(state,v){
            state.leave = v
        }
    }
}
