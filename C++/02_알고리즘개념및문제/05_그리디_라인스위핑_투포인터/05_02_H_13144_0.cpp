#include <bits/stdc++.h>
using namespace std;

long long n, e, s, cnt[100001], a[100001], ret;

int main(){
    cin >> n;
    for(int i = 0; i < n; i++){
        cin >> a[i];
    }

    while(e < n){
        if(!cnt[a[e]]){
            cnt[a[e]]++;
            e++;
        }else{
            ret += (e-s);
            cnt[a[e]]--;
            s++;
        }
    }

    ret += (e-s) * (e-s+1)/2;
    
    cout <<ret;

    return 0;
}