#include <bits/stdc++.h>
using namespace std;

/**
 * string, int 
 *      map : O(logN)
 *      array : O (N)
 * int, string
 *      map : O(N)
 *      array : O(1)
*/

int n, m;
string s;
string a[100004];
map<string, int> mp2;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> n >> m;
    for(int i = 0; i < n; i++){
        cin >> s;
        a[i+1] = s;
        mp2[s] = i+1;
    }

    for(int i = 0; i < m; i++){
        cin >> s;

        if(atoi(s.c_str())){
            cout << a[atoi(s.c_str())] << "\n";
        }else{
            cout << mp2[s] << "\n";
        }
    }
}