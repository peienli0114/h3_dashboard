import { create } from "zustand";
import r7_data from '../store/taipei-h_cnt-p_cnt.json'
// 定義人物資料結構
interface Person {
    rank: number;            // 排名
    name: string;            // 姓名
    country_territory: string; // 國家/地區
    net_worth: number;       // 淨資產
    age: number;             // 年齡
    source: string;          // 財富來源
    industry: string;        // 產業
}

// 定義地點資料結構
interface PersonLocation {
    country_territory: string,  // 國家/地區
    longitude: number,          // 經度
    latitude: number,           // 緯度
    representative_city: string // 代表城市
}


// 定義六邊形單元的屬性
type properties = {
    "row": string;
    "value": string;
  };
  
  // 定義每個鍵的值的結構
  type detail = {
    "family": string;
    "qualifier": string;
    "timestamp": string;
    "properties": properties[];
  };

// 定義 r7_data 的結構，鍵名為任意 string，值為 detail
type raw_data = Record<string, detail>;



// 定義資料存儲介面
interface DataStore {

    selections:string[];
    


    people: Person[];                                   // 人物資料陣列
    setPeople: (newPeople: Person[]) => void;           // 設置人物資料
    addPerson: (newPerson: Person) => Promise<void>;    // 添加人物
    removePerson: (name: string, country: string) => Promise<void>; // 移除人物
    selectedPerson: Person | null;                      // 選中的人物
    setSelectedPerson: (person: Person) => void;        // 設置選中的人物
    fetchPeople: () => Promise<void>;                   // 獲取人物資料
    fetchLocations: () => Promise<void>;                // 獲取地點資料
    locations: PersonLocation[];                        // 地點資料陣列
    all data:
}

// 創建 Zustand store，注意這裡添加了 get 參數用於訪問當前狀態
export const useDataStore = create<DataStore>((set, get) => ({

    const keys: string[] = Object.keys(r7_data);



    all data: [],              // 初始化空人物陣列
    selectedPerson: null,    // 初始化選中人物為空
    locations: [],           // 初始化空地點陣列

    // 設置人物資料的函數
    setPeople: (newPeople) => set({ people: newPeople }),

    // 獲取人物資料的異步函數
    fetchPeople: async () => {
        try {
            // 從 API 獲取人物資料
            const response = await fetch("http://localhost:8000/api/people");
            if (!response.ok) {
                throw new Error("網絡響應不正常");
            }
            const data = await response.json();
            // 更新狀態
            set({ people: data });
        } catch (error) {
            // 記錄錯誤並重新拋出以便 UI 層處理
            console.error("獲取人物資料失敗:", error);
            throw error; // 重新拋出錯誤，讓 UI 層處理
        }
    },


    // 添加人物的異步函數
    addPerson: async (newPerson) => {
        try {
            // 在 API 調用前檢查重複，使用 get() 訪問當前狀態
            const personExists = get().people.some(
                (p) => p.name === newPerson.name && p.country_territory === newPerson.country_territory
            );
    
            // 如果人物已存在，拋出錯誤
            if (personExists) {
                throw new Error("此人已存在，無法重複添加");
            }
    
            // 調用 API 添加人物
            const response = await fetch("http://localhost:8000/api/add_person", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPerson),
            });
    
            // 檢查 API 響應
            if (!response.ok) {
                throw new Error("添加失敗，請檢查伺服器回應");
            }
    
            // API 調用成功後更新狀態
            set((state) => ({ people: [...state.people, newPerson] }));
        } catch (error) {
            // 記錄錯誤並重新拋出以便 UI 層處理
            console.error("添加人物失敗:", error);
            throw error; // 重新拋出錯誤，讓 UI 層處理
        }
    },

    // 移除人物的異步函數
    removePerson: async (name, country) => {
        try {
            // 在 API 調用前檢查人物是否存在
            const personExists = get().people.some(
                (p) => p.name === name && p.country_territory === country
            );
    
            // 如果人物不存在，拋出錯誤
            if (!personExists) {
                throw new Error(`找不到 ${name} (${country})，無法刪除`);
            }
    
            // 調用 API 刪除人物，保持原始 API 端點結構
            const response = await fetch("http://localhost:8000/api/remove_person", {
                method: "POST", // 保持原始方法為 POST
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, country_territory: country }), // 保持原始參數結構
            });
    
            // 檢查 API 響應
            if (!response.ok) {
                throw new Error("刪除失敗，請檢查伺服器回應");
            }
    
            // API 調用成功後更新狀態，移除符合條件的人物
            set((state) => ({
                people: state.people.filter((p) => !(p.name === name && p.country_territory === country)),
            }));
        } catch (error) {
            // 記錄錯誤並重新拋出以便 UI 層處理
            console.error("移除人物失敗:", error);
            throw error; // 重新拋出錯誤，讓 UI 層處理
        }
    },

    // 設置選中人物的函數
    setSelectedPerson: (person) => set({ selectedPerson: person }),
}));

export { };