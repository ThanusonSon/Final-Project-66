from zapv2 import ZAPv2
import time
import sys
import json
import webbrowser

print("python ready to run")

def fix_url(url):
    if not url.startswith('http://') and not url.startswith('https://'):
        url = 'https://' + url
    return url

def run_zap_scan(url):
    # zap = ZAPv2(apikey='n6a665p7i15p0f0vgbj18l5j4q', proxies={'http': 'http://34.87.79.43:8090', 'https': 'http://34.87.79.43:8090'})
    zap = ZAPv2(apikey='ajkvq55433snu8ihvhrlfflmrn', proxies={'http': 'http://34.87.79.43:8080', 'https': 'http://34.87.79.43:8080'})

    try:
       
        print('Accessing target website...')
        
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
            print('No hosts data found in the report.')

        if 'alertsSummary' in report_json['site'][0]:
            alerts_summary_data = report_json['site'][0]['alertsSummary']
        else:
            alerts_summary_data = None
            print('No alertsSummary data found in the report.')

       
        report_file_name = './public/python/zap_report.json'  
        # with open(report_file_name, 'w', encoding='utf-8') as report_file:
        #     report_file.write(report_json)
        # print(f'Scan report saved to: {report_file_name}')
        with open(report_file_name, 'w', encoding='utf-8') as report_file:
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
        webbrowser.get('edge').open(file ,new=2)



    except Exception as e:
        print('An error occurred:', str(e))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python runzap.py <target_url>")
    else:
        target_url = fix_url(sys.argv[1])
        print("Running ZAP scan for:", target_url)
        run_zap_scan(target_url)

# run_zap_scan()