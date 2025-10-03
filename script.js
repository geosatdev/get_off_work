// script.js

document.getElementById('calculationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 阻止表單預設的提交行為

    // 1. 取得輸入值
    const startTimeStr = document.getElementById('startTime').value; // e.g., "07:30"
    const breakDuration = parseFloat(document.getElementById('breakDuration').value); // e.g., 1.5
    // 每日工作時長固定為 8
    const workDuration = parseFloat(document.getElementById('workDuration').value); 

    // 2. 計算總工作時數 (含休息)
    // 總時數 = 實際工作時數 (8) + 休息時數 (1.5)
    const totalDurationHours = workDuration + breakDuration;

    // 將上班時間 (HH:MM) 拆分成小時和分鐘
    const [startHour, startMinute] = startTimeStr.split(':').map(Number);

    // 3. 創建一個 Date 物件作為計算基準 (使用今日日期)
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0); // 設定為上班時間

    // 4. 計算總共要增加的毫秒數
    // 總時數 (1.5) -> 總分鐘 (90) -> 總毫秒
    const totalDurationMs = totalDurationHours * 60 * 60 * 1000;

    // 5. 取得下班時間的毫秒數
    const endTimeMs = startDate.getTime() + totalDurationMs;
    const endDate = new Date(endTimeMs); // 創建下班時間 Date 物件

    // 6. 格式化結果時間 (HH:MM)
    // 使用 padStart(2, '0') 確保時間格式為兩位數 (例如：9 變成 09)
    const endHour = String(endDate.getHours()).padStart(2, '0');
    const endMinute = String(endDate.getMinutes()).padStart(2, '0');
    
    const endTimeFormatted = `${endHour}:${endMinute}`;

    // 7. 顯示結果
    document.getElementById('endTimeDisplay').textContent = endTimeFormatted;
    
    // 顯示結果區塊
    const resultOutput = document.getElementById('resultOutput');
    resultOutput.classList.remove('d-none'); // 讓結果區塊顯示出來

    // (RWD 優化) 平滑捲動到結果區塊，讓使用者在手機上也能清楚看到結果
    resultOutput.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
