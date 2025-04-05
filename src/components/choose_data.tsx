import React, { useState } from "react"; // 引入 React 和 useState 用於狀態管理
import { Box, Button, Typography, Menu, MenuItem } from "@mui/material"; // 引入 MUI 組件用於 UI 設計
import r7_data from '../store/taipei-h_cnt-p_cnt.json'; // 引入 JSON 資料，預設為物件結構
import MapApp from "./chart_map";

// 定義 properties 型別，表示每個六邊形單元的屬性
type properties = {
  "row": string; // 六邊形單元的 ID 或位置
  "value": string; // 六邊形單元的高度或數值
};

// 定義 detail 型別，表示 JSON 中每個鍵的值的結構
type detail = {
  "family": string; // 分類或群組名稱
  "qualifier": string; // 限定詞，用於區分不同數據集
  "timestamp": string; // 時間戳記，表示數據的時間點
  "properties": properties[]; // 六邊形單元的屬性陣列
};

// 定義 raw_data 型別，表示 JSON 的整體結構
type raw_data = {
  "demographic-h_cnt-1721210079111": detail; // 鍵名對應一個 detail 物件，可能有多個鍵
};

// 從 r7_data 中提取所有鍵，存為陣列，例如 ["demographic-h_cnt-1721210079111"]
const keys = Object.keys(r7_data);

// 定義 PeopleList 組件，實現下拉選單功能
const PeopleList: React.FC = () => {
  // 狀態：儲存當前選中的 qualifier，初始值為空字串
  const [selected, setSelected] = useState<string>("");
  // 狀態：控制下拉選單的錨點元素，初始為 null
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // 根據 anchorEl 是否存在，決定選單是否顯示
  const open = Boolean(anchorEl);

  // 事件處理：點擊按鈕時觸發，設定錨點元素以打開選單
  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget); // 將當前按鈕設為錨點
  }

  // 事件處理：關閉選單，將錨點設為 null
  function handleClose() {
    setAnchorEl(null); // 清除錨點，關閉選單
  }

  // 事件處理：選擇某個項目，更新 selected 狀態並關閉選單
  function handleSelected(key: string) {
    // 根據鍵從 r7_data 中獲取對應的 detail 物件
    const selectedDetail = r7_data[key as keyof typeof r7_data];
    // 將選中的 qualifier 存入狀態
    setSelected(selectedDetail.qualifier);
    // 關閉選單
    handleClose();
  }

  return (
    // 外層容器，提供 padding 間距
    <Box sx={
        {
            height:'100%',
            width:'100%'
        }
    }>

        <Box p={2}>
        {/* 主按鈕：用於觸發下拉選單 */}
        <Button
            variant="contained" // 使用填充樣式
            onClick={handleClick} // 點擊時打開選單
            sx={{
            textTransform: "none", // 文字不轉為大寫
            fontSize: "16px", // 字體大小
            mb: 2, // 下方間距
            backgroundColor: "#A6A6A6", // 背景色
            width: "100%", // 寬度佔滿容器
            }}
        >
            {/* 按鈕文字：顯示 "選擇項目" 及當前選中的 qualifier */}
            選擇項目：{selected || "請選擇"} {/* 如果 selected 為空，顯示 "請選擇" */}
        </Button>

        {/* 下拉選單：使用 MUI 的 Menu 組件 */}
        <Menu
            anchorEl={anchorEl} // 錨點元素，決定選單位置
            open={open} // 控制選單是否顯示
            onClose={handleClose} // 點擊外部時關閉選單
        >
            {/* 選單內容容器 */}
            <Box
            sx={{
                maxHeight: "200px", // 最大高度，超出時滾動
                overflowY: "auto", // 啟用垂直滾動
                display: "flex", // 使用 flex 布局
                flexDirection: "column", // 垂直排列項目
                gap: 1, // 項目間距
                p: 1, // 內部間距
                backgroundColor: "#A6A6A6", // 背景色
                borderRadius: "8px", // 圓角
            }}
            >
            {/* 遍歷 r7_data 的鍵，生成選單項目 */}
            {keys.map((key) => {
                // 根據鍵獲取對應的 detail 物件
                const detail = r7_data[key as keyof typeof r7_data];
                return (
                // 每個選單項目
                <MenuItem
                    key={key} // 唯一鍵，使用 JSON 的鍵名
                    sx={{ p: 0, backgroundColor: "#A6A6A6" }} // 移除內部間距，保持背景色
                >
                    {/* 選項按鈕 */}
                    <Button
                    fullWidth // 寬度佔滿
                    variant={selected === detail.qualifier ? "contained" : "outlined"} // 選中時使用填充樣式
                    onClick={() => handleSelected(key)} // 點擊時選擇該項目
                    sx={{
                        textTransform: "none", // 文字不轉為大寫
                        padding: "8px 8px", // 內部間距
                        fontSize: "12px", // 字體大小
                        borderWidth: "0px", // 移除邊框
                        backgroundColor: selected === detail.qualifier ? "#1976d2" : "#CDCDCD", // 選中時藍色，未選中時灰色
                        color: selected === detail.qualifier ? "#ffffff" : "#000000", // 文字顏色
                    }}
                    >
                    {/* 按鈕內容：左右分開顯示 family 和 qualifier */}
                    <Box
                        display="flex" // 使用 flex 布局
                        justifyContent="space-between" // 左右分開
                        width="100%" // 寬度佔滿
                    >
                        {/* 左邊顯示 family */}
                        <Typography sx={{ fontSize: "12px" }}>
                        {detail.family}
                        </Typography>
                        {/* 右邊顯示 qualifier */}
                        <Typography sx={{ fontSize: "12px" }}>
                        {detail.qualifier}
                        </Typography>
                    </Box>
                    </Button>
                </MenuItem>
                );
            })}
            </Box>
        </Menu>
        </Box>
    </Box>
  );
};

// 匯出組件
export default PeopleList;