#include <bits/stdc++.h>
using namespace std;

/**
 * 시간초과
*/

int n, a[1000004];

int go(int here){
    int ret = -1;
    for(int i = here; i < n; i++){
        if(here == (n-1)) break;
        if(a[here] < a[i]){ ret = a[i]; break; }
    }
    return ret;
}

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> n;

    for(int i = 0; i < n; i++){
        cin >> a[i];
    }

    for(int i = 0; i < n; i++){
        cout << go(i) << " ";
    }
    
}

