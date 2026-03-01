export type AccountData = {
    channelStats: {
        totalViews: string;
        likes: string;
        shares: string;
        comments: string;
        saves: string;
        totalVideos: number;
        titleTagline: string;
    };
    brandAnalysis: {
        brand: string;
        videoCount: number;
        avgViews: string;
    }[];
    analysisConfig: {
        icon: string;
        title: string;
        highlightWord: string;
        description: string;
    };
    topVideos: {
        id: string;
        title: string;
        views: string;
        likes: string;
        comments: string;
        shares: string;
        hasCrown: boolean;
        tags: string[];
        date: string;
    }[];
};

export const accountsData: Record<string, AccountData> = {
    vietchop: {
        channelStats: {
            totalViews: "74,2 TRIỆU",
            likes: "1,62M",
            shares: "52,6K",
            comments: "40,8K",
            saves: "39,2K",
            totalVideos: 439,
            titleTagline: "lượt xem trong 12 tháng",
        },
        brandAnalysis: [
            { brand: "VinFast", videoCount: 87, avgViews: "168K" },
            { brand: "Kia", videoCount: 54, avgViews: "-" },
            { brand: "Lexus", videoCount: 18, avgViews: "107K" },
            { brand: "Audi", videoCount: 17, avgViews: "195K" },
            { brand: "Toyota", videoCount: 12, avgViews: "102K" },
            { brand: "Mazda", videoCount: 12, avgViews: "152K" },
            { brand: "BMW", videoCount: 11, avgViews: "162K" },
            { brand: "Lynk & Co", videoCount: 8, avgViews: "410K" },
            { brand: "Porsche", videoCount: 6, avgViews: "82K" },
        ],
        analysisConfig: {
            icon: "🚗",
            title: "Thương Hiệu Xe",
            highlightWord: "thương hiệu",
            description: `Lynk & Co chỉ có 8 video nhưng avg 410K — cao gấp 2.4× VinFast (87 video, 168K avg). 
Audi với 17 video cũng ấn tượng: 195K avg. Những thương hiệu "gây tranh cãi" luôn tạo engagement mạnh hơn xe phổ thông.`
        },
        topVideos: [
            {
                id: "01",
                title: "Tạm biệt VTV cáp...",
                views: "2,7M",
                likes: "47,6K",
                comments: "296",
                shares: "0",
                hasCrown: false,
                tags: ["STORYTELLING"],
                date: "01/08/2025",
            },
            {
                id: "02",
                title: "Tổng tài TikTok :)) – ...",
                views: "2,3M",
                likes: "58,1K",
                comments: "0",
                shares: "4.225",
                hasCrown: false,
                tags: ["LIFESTYLE"],
                date: "18/09/2025",
            },
            {
                id: "03",
                title: "Pháp sư xoá lỗi – Đẳng ...",
                views: "2,0M",
                likes: "45,8K",
                comments: "1.139",
                shares: "0",
                hasCrown: false,
                tags: ["DRAMA"],
                date: "06/11/2025",
            },
            {
                id: "04",
                title: "Đại sứ thương hiệu S...",
                views: "1,8M",
                likes: "61,0K",
                comments: "0",
                shares: "1.771",
                hasCrown: true,
                tags: ["SPONSORED"],
                date: "04/08/2025",
            },
            {
                id: "05",
                title: "Cục Đăng kiểm nên x...",
                views: "1,7M",
                likes: "25,4K",
                comments: "262",
                shares: "0",
                hasCrown: false,
                tags: ["PHẢN BIỆN"],
                date: "31/10/2025",
            },
        ],
    },
    blossominn: {
        channelStats: {
            totalViews: "56 NGHÌN",
            likes: "1.6K",
            shares: "50",
            comments: "105",
            saves: "15",
            totalVideos: 18,
            titleTagline: "lượt xem tổng cộng",
        },
        brandAnalysis: [
            { brand: "#fyp", videoCount: 11, avgViews: "5.5K" },
            { brand: "#trending", videoCount: 9, avgViews: "4.8K" },
            { brand: "#duhocsinh", videoCount: 8, avgViews: "6.2K" },
            { brand: "#uk", videoCount: 3, avgViews: "14.0K" },
            { brand: "#2025newyear", videoCount: 3, avgViews: "400" },
            { brand: "#cute", videoCount: 2, avgViews: "380" },
            { brand: "#lifestyle", videoCount: 1, avgViews: "41.3K" },
        ],
        analysisConfig: {
            icon: "🏷️",
            title: "Top Hashtags",
            highlightWord: "hashtags",
            description: `#uk và #lifestyle đang mang lại lượng views khổng lồ nhất (lên đến hơn 41.3K avg view). Mặc dù #fyp được sử dụng nhiều nhất (11 videos) nhưng mức độ engagement trung bình lại thua xa các tag đặc tả đời sống du học sinh.`
        },
        topVideos: [
            {
                id: "01",
                title: "Đặc sản VN sang đây có giá...",
                views: "41,3K",
                likes: "703",
                comments: "20",
                shares: "44",
                hasCrown: true,
                tags: ["LIFESTYLE"],
                date: "27/05/2025",
            },
            {
                id: "02",
                title: "Quả sound không thể hợp...",
                views: "5,6K",
                likes: "25",
                comments: "5",
                shares: "1",
                hasCrown: false,
                tags: ["LIFESTYLE"],
                date: "08/03/2025",
            },
            {
                id: "03",
                title: "Cuộc sống dhs tuy vất...",
                views: "662",
                likes: "26",
                comments: "8",
                shares: "0",
                hasCrown: false,
                tags: ["STORYTELLING"],
                date: "19/03/2025",
            },
            {
                id: "04",
                title: "Miss my home so much🥹",
                views: "610",
                likes: "12",
                comments: "3",
                shares: "0",
                hasCrown: false,
                tags: ["STORYTELLING"],
                date: "14/03/2025",
            },
            {
                id: "05",
                title: "Mẹ hỏi sao sang Anh toàn...",
                views: "609",
                likes: "18",
                comments: "4",
                shares: "2",
                hasCrown: false,
                tags: ["LIFESTYLE"],
                date: "28/02/2025",
            },
        ],
    }
};
