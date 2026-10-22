# 📊 Google Sheet Integration for Portfolio Queries

This guide connects your portfolio contact form directly to a Google Sheet under **`query.shuvam@gmail.com`**. Every visitor query will automatically append a new row with separate columns for Name, Email, Phone Number, and Message, and also send an email alert to `query.shuvam@gmail.com`!

---

## ⚡ Quick 2-Minute Setup

### Step 1: Create the Google Sheet
1. Log into your Google account: **`query.shuvam@gmail.com`**.
2. Go to [sheets.new](https://sheets.new) to create a new spreadsheet.
3. Rename the spreadsheet to **`Portfolio Queries`**.
4. In Row 1, add these column headers (optional, the script will also auto-create them):
   - **Column A**: `Date & Time`
   - **Column B**: `Name`
   - **Column C**: `Email`
   - **Column D**: `Phone Number`
   - **Column E**: `Message`

---

### Step 2: Open Google Apps Script
1. In your Google Sheet, click **Extensions** in the top menu.
2. Click **Apps Script**.
3. Replace any code in `Code.gs` with the following script:

```javascript
/**
 * Shuvam Portfolio Query Handler
 * Automatically saves inquiries into Google Sheets and alerts query.shuvam@gmail.com
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Auto-create styled headers if brand new sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Date & Time", "Name", "Email", "Phone Number", "Message"]);
      var headerRange = sheet.getRange(1, 1, 1, 5);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#e5c97b");
      headerRange.setFontColor("#1a1a2e");
    }

    var data = {};
    if (e.parameter && Object.keys(e.parameter).length > 0) {
      data = e.parameter;
    } else if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = {};
      }
    }

    var name = data.name || "Anonymous";
    var email = data.email || "Not Provided";
    var phone = data.phone || "N/A";
    var message = data.message || "";
    var timestamp = new Date();

    // Append the row into the sheet
    sheet.appendRow([timestamp, name, email, phone, message]);

    // Send instant email notification to query.shuvam@gmail.com
    try {
      MailApp.sendEmail({
        to: "query.shuvam@gmail.com",
        subject: "🚀 New Portfolio Inquiry: " + name,
        body: "You received a new inquiry from your portfolio website!\n\n" +
              "👤 Name: " + name + "\n" +
              "📧 Email: " + email + "\n" +
              "📞 Phone: " + phone + "\n\n" +
              "💬 Message:\n" + message + "\n\n" +
              "⏰ Received At: " + timestamp.toLocaleString()
      });
    } catch (mailError) {
      Logger.log("Email notification skipped: " + mailError);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput("Google Sheet Webhook is active and listening for queries!")
    .setMimeType(ContentService.MimeType.TEXT);
}
```

---

### Step 3: Deploy as Web App
1. At the top right of Apps Script, click the blue **Deploy** button > **New deployment**.
2. Click the gear icon (⚙️) next to *Select type* and choose **Web app**.
3. Fill in:
   - **Description**: `Portfolio Query Webhook`
   - **Execute as**: `Me (query.shuvam@gmail.com)`
   - **Who has access**: `Anyone` *(Crucial so visitors can submit inquiries without signing in)*
4. Click **Deploy**.
5. Google may ask to authorize access:
   - Click **Authorize access**
   - Choose `query.shuvam@gmail.com`
   - Click **Advanced** > **Go to Untitled project (unsafe)**
   - Click **Allow**
6. Copy the **Web App URL** (looks like `https://script.google.com/macros/s/AKfycbx.../exec`).

---

### Step 4: Link to Your Portfolio
1. Open [`src/main.js`](file:///c:/Users/SHUVAM%20DIKSHIT/OneDrive/Desktop/My%20portfolio/src/main.js).
2. Set the `GOOGLE_SHEET_SCRIPT_URL`:
   ```javascript
   const GOOGLE_SHEET_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
3. That's it! Every contact message sent will immediately appear in your Google Sheet and alert your email.
