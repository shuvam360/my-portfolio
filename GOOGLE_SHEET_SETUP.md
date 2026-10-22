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
 * Shuvam Portfolio Query Handler & Auto-Responder
 * 1. Saves inquiries into Google Sheets (Timestamp, Name, Email, Phone, Message)
 * 2. Alerts query.shuvam@gmail.com with inquiry details
 * 3. Sends an automated Thank You reply email to the visitor
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

    var name = data.name || "Friend";
    var email = data.email ? data.email.trim() : "";
    var phone = data.phone || "N/A";
    var message = data.message || "";
    var timestamp = new Date();

    // 1. Append inquiry row into the Google Sheet
    sheet.appendRow([timestamp, name, email, phone, message]);

    // 2. Alert Shuvam at query.shuvam@gmail.com
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
    } catch (adminMailErr) {
      Logger.log("Admin alert email skipped: " + adminMailErr);
    }

    // 3. Send automated "Thank You" confirmation email to the visitor
    if (email && email.indexOf("@") !== -1) {
      try {
        var visitorSubject = "Thank you for reaching out, " + name + "!";
        
        var plainBody = "Hi " + name + ",\n\n" +
          "Thank you for your response message! I have received your inquiry from my portfolio website.\n\n" +
          "Summary of your message:\n" +
          "• Message: " + message + "\n" +
          (phone && phone !== "N/A" ? "• Phone: " + phone + "\n" : "") +
          "\nI will review your message and get back to you as soon as possible.\n\n" +
          "Best regards,\n" +
          "Shuvam Dikshit\n" +
          "B.Tech CSE (AI/ML) Student\n" +
          "Direct Email: shuvamdikshit5@gmail.com\n" +
          "Portfolio: https://shuvam360.github.io/my-portfolio/";

        var htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 580px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #2d3748;">
            <h2 style="color: #1a1a2e; margin-top: 0; font-size: 20px;">Thank you for reaching out, ${name}! 👋</h2>
            <p style="font-size: 15px; line-height: 1.6; color: #4a5568;">
              <strong>Thank you for your response message!</strong> I have successfully received your inquiry through my portfolio website.
            </p>
            <div style="background-color: #f7fafc; border-left: 4px solid #e5c97b; padding: 14px 18px; margin: 20px 0; border-radius: 4px;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #718096; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Your Message:</p>
              <p style="margin: 0; color: #2d3748; font-style: italic; font-size: 14px; line-height: 1.5;">"${message}"</p>
            </div>
            <p style="font-size: 14px; line-height: 1.6; color: #4a5568;">
              I will review your message and get back to you as soon as possible.
            </p>
            <hr style="border: none; border-top: 1px solid #edf2f7; margin: 24px 0;" />
            <p style="margin: 0; font-weight: bold; color: #1a1a2e; font-size: 15px;">Shuvam Dikshit</p>
            <p style="margin: 3px 0 0 0; color: #718096; font-size: 13px;">B.Tech CSE (AI/ML) | Aspiring Machine Learning Engineer</p>
            <p style="margin: 6px 0 0 0; font-size: 13px;">
              <a href="mailto:shuvamdikshit5@gmail.com" style="color: #6b6837; text-decoration: none; font-weight: 500;">shuvamdikshit5@gmail.com</a>
            </p>
          </div>
        `;

        MailApp.sendEmail({
          to: email,
          subject: visitorSubject,
          body: plainBody,
          htmlBody: htmlBody
        });
      } catch (visitorMailErr) {
        Logger.log("Visitor thank you email error: " + visitorMailErr);
      }
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
    .createTextOutput("Google Sheet Webhook & Auto-Responder is active and listening for queries!")
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
