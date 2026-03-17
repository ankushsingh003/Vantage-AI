import httpx
import json
import asyncio

async def verify_json():
    print("Fetching Intelligence Report...")
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            resp = await client.get("http://localhost:8000/api/intelligence/full-report")
            if resp.status_code == 200:
                data = resp.json()
                print("Report Fetched Successfully.")
                specialized = data.get("operational", {}).get("specialized", {})
                print("\n7-Pillar specialized Data Check:")
                print(json.dumps(specialized, indent=2))
                
                if not specialized:
                    print("\nERROR: Specialized report is MISSING or EMPTY!")
                else:
                    exec_sum = specialized.get("executive_summary", {})
                    if not exec_sum.get("why"):
                        print("\nERROR: Executive Summary 'why' is empty!")
                    else:
                        print("\nSUCCESS: Data verified.")
            else:
                print(f"Error: Backend returned status {resp.status_code}")
        except Exception as e:
            print(f"Connection Error: {e}. Ensure the backend is running.")

if __name__ == "__main__":
    asyncio.run(verify_json())
