document.getElementById('calculationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // 防止表單送出後頁面重新載入

    // 1. 取得輸入值
    const startTimeStr = document.getElementById('startTime').value;
    const breakDuration = parseFloat(document.getElementById('breakDuration').value);
    const workDuration = parseFloat(document.getElementById('workDuration').value);

    // 檢查時間格式是否正確
    if (!startTimeStr) {
        alert('請輸入上班時間！');
        return;
    }

    // 將上班時間 (HH:MM) 拆分成小時和分鐘
    const [startHour, startMinute] = startTimeStr.split(':').map(Number);

    // 2. 計算總工時（分鐘）
    // 總工作分鐘 = (工作時長 + 休息時長) * 60
    const totalDurationMinutes = (workDuration + breakDuration) * 60;

    // 3. 核心時間計算
    
    // 建立一個今天的 Date 物件，並設定為上班時間
    // 必須包含日期資訊才能計算跨日 (雖然本案例不太會跨日，但這是個好習慣)
    const startDate = new Date();
    startDate.setHours(startHour, startMinute, 0, 0); // 設定小時、分鐘、秒、毫秒

    // 計算下班時間
    // Date.getTime() 取得從 1970/1/1 至今的毫秒數
    // totalDurationMinutes * 60 * 1000 將分鐘轉為毫秒
    const endTimeMs = startDate.getTime() + totalDurationMinutes * 60 * 1000;
    const endDate = new Date(endTimeMs); // 建立新的 Date 物件作為下班時間

    // 4. 格式化結果時間 (HH:MM)
    // 確保小時和分鐘都是兩位數 (例如 9:05 會顯示為 09:05)
    const endHour = String(endDate.getHours()).padStart(2, '0');
    const endMinute = String(endDate.getMinutes()).padStart(2, '0');
    
    const endTimeFormatted = `${endHour}:${endMinute}`;

    // 5. 顯示結果
    document.getElementById('endTimeDisplay').textContent = endTimeFormatted;
    
    // 顯示結果區塊
    const resultOutput = document.getElementById('resultOutput');
    resultOutput.classList.remove('d-none'); // 移除 d-none 讓區塊顯示

    // 讓使用者更清楚看到結果 (可選：平滑捲動到結果)
    resultOutput.scrollIntoView({ behavior: 'smooth' });
});