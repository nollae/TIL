#include <bits/stdc++.h>
using namespace std;  

/**
 * 입력부터 초기값으로 설정한 후, 원하는 부분의 값을 변경한다
*/

int n, m, a[104][104];
string s; 
int main () {
	cin >> n >> m; 
	for(int i = 0; i < n; i++){
		cin >> s; 
		for(int j = 0; j < m; j++){ 
			if(s[j] == '.')a[i][j] = -1;
			else a[i][j] = 0;
		}
	}
	for(int i = 0; i < n; i++){ 
		for(int j = 0; j < m; j++){
			if(a[i][j] == 0){ 
				int cnt = 1;
				while(a[i][j + 1] == -1){
					a[i][j + 1] = cnt++;
					j++;
				} 
			}
		} 
	} 
	for(int i = 0; i < n; i++){
		for(int j = 0; j < m; j++) cout << a[i][j] << " ";
		cout << "\n";
	} 
	return 0;
}