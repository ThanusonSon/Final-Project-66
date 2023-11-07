from zapv2 import ZAPv2
import time
import sys
import json
import webbrowser
import requests

print("python ready to run")

# def send_scan_status(scan_completed):
#     api_url = 'http://localhost:3000/scan-status'  # URL ของ API Endpoint ใน Node.js
#     data = {'scanCompleted': scan_completed}

#     response = requests.post(api_url, json=data)

#     if response.status_code == 200:
#         print('Scan status sent successfully.')
#     else:
#         print('Failed to send scan status.')

# # เมื่อสแกนเสร็จสิ้น


# # เมื่อสแกนยังไม่เสร็จสิ้น
# # send_scan_status(False)

def fix_url(url):
    if not url.startswith('https://') and not url.startswith('http://'):
        url = 'https://' + url
    return url

def run_zap_scan(url):
    # กำหนดค่าพารามิเตอร์สำหรับเชื่อมต่อกับ OWASP ZAP API
    zap = ZAPv2(apikey='ajkvq55433snu8ihvhrlfflmrn', proxies={'http': 'http://34.87.79.43:8080', 'https': 'http://34.87.79.43:8080'})
    # zap = ZAPv2(apikey='n6a665p7i15p0f0vgbj18l5j4q', proxies={'http': 'http://localhost:8080', 'https': 'http://localhost:8080'})

    try:
        # เปิดหน้าเว็บที่ต้องการทดสอบ
        print('Accessing target website...')
        # target_url = 'http://www.google.com'  # แทนที่ด้วย URL ของเว็บไซต์ที่ต้องการทดสอบ
        target_url = url
        zap.urlopen(target_url)

        # Spider the website
        print('Spidering the website...')
        zap.spider.scan(target_url)
        while int(zap.spider.status()) < 100:
            # Wait for the spidering to complete
            time.sleep(5)

        print('Starting the active scan...')
        zap.ascan.scan(target_url)
        while int(zap.ascan.status()) < 100:
            # Wait for the active scan to complete
            time.sleep(5)

        # แสดงรายงานการสแกน
        print('Generating the scan report...')
        # report_html = zap.core.htmlreport()
        report_json = json.loads(zap.core.jsonreport()) 

        if 'hosts' in report_json['site'][0]:
            hosts_data = report_json['site'][0]['hosts']
        else:
            hosts_data = None

        if 'alertsSummary' in report_json['site'][0]:
            alerts_summary_data = report_json['site'][0]['alertsSummary']
        else:
            alerts_summary_data = None

        # บันทึกรายงานในไฟล์
        report_file_name = './public/python/zap_report.json'  # ชื่อไฟล์ที่ต้องการบันทึกรายงาน
        # with open(report_file_name, 'w', encoding='utf-8') as report_file:
        #     report_file.write(report_html)
        # print(f'Scan report saved to: {report_file_name}')
        with open(report_file_name, 'w+', encoding='utf-8') as report_file:
            scan_report = {
                'site': target_url,
                'alerts': report_json['site'][0]['alerts'],  
                'hosts': hosts_data,  
                'alerts_summary': alerts_summary_data,  
            }
            json.dump(scan_report, report_file, indent=4) 
        print(f'Scan report saved to: {report_file_name}')

        file = 'http://localhost:3000/report.html'
        # public\report.html
        # C:\Users\ratha\Downloads\vulnerability_web\public\report.html
        browser_path = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
        webbrowser.register('edge', None, webbrowser.BackgroundBrowser(browser_path))
        webbrowser.get('edge').open(file)



        # send_scan_status(True)


    except Exception as e:
        print('An error occurred:', str(e))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python runzap.py <target_url>")
    else:
        target_url = fix_url(sys.argv[1])
        print("Running ZAP scan for:", target_url)
        run_zap_scan(target_url)

# run_zap_scan("https://www.nkk.ac.th")