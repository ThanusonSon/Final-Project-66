from zapv2 import ZAPv2
import time
import sys
import json
import subprocess
import webbrowser
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

print("python ready to run")

def fix_url(url):
    if not url.startswith('https://') and not url.startswith('http://'):
        url = 'https://' + url
    return url

def run_zap_scan(url):
    zap = ZAPv2(apikey='ajkvq55433snu8ihvhrlfflmrn', proxies={'http': 'http://34.87.79.43:8080', 'https': 'http://34.87.79.43:8080'})
    # zap = ZAPv2(apikey='n6a665p7i15p0f0vgbj18l5j4q', proxies={'http': 'http://localhost:8080', 'https': 'http://localhost:8080'})

    print('Accessing target website...')
    # target_url = 'http://www.google.com'  # แทนที่ด้วย URL ของเว็บไซต์ที่ต้องการทดสอบ
    target_url = url
    zap.urlopen(target_url)

    print('Spidering the website...')
    zap.spider.scan(target_url)
    while int(zap.spider.status()) < 100:
        time.sleep(5)

    print('Starting the active scan...')
    zap.ascan.scan(target_url)
    while int(zap.ascan.status()) < 100:
        time.sleep(5)

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
    # driver.get(file)
    # body = driver.find_element("id","scanModal")
    # body.click()

# ระบุคำสั่งที่ใช้ในการเรียก Node.js และส่งไฟล์ JavaScript เป็นอาร์กิวเมนต์
    # subprocess.run('cd .\myfunction\public\python')
    # public\python\reface.js
    # D:\Final Projrct 1_2566\Final-Project-66\public\python
#     js_file_path = r'.\public\reface.js'
#     command = ["node", js_file_path]

# # เรียกใช้ Node.js และไฟล์ JavaScript
#     result=subprocess.run(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

# # พิมพ์ผลลัพธ์ที่ได้จากไฟล์ JavaScript
#     print("รายละเอียดการทำงาน:", result.stdout)
#     print("ข้อผิดพลาด (ถ้ามี):", result.stderr)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python runzap.py <target_url>")
    else:
        target_url = fix_url(sys.argv[1])
        print("Running ZAP scan for:", target_url)
        run_zap_scan(target_url)

# run_zap_scan("https://www.nkk.ac.th")