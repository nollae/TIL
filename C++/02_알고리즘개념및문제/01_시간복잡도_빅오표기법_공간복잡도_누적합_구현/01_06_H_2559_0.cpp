#include <bits/stdc++.h>
using namespace std;

/**
 * 유감스럽게도.. 어떠한 방법을 하더라도 시간초과가 나온다.ㅠ
 * 기존에 배운 알고리즘 활용 방법으로 1차적으로 모색하자.
*/
int N, K, ret = -10000000;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> N >> K;
    
    // int a[N], ret[N - (K-1)];

    int a[N];

    for(int i = 0; i < N; i++){
        cin >> a[i];
    }

    for(int i = 0; i < N - (K-1); i++){
        int sum = 0;
        for(int j = 0; j < K; j++){
            sum += a[i+j];
        }
        if(ret < sum) ret = sum;
    }

    // sort(ret, ret + N - (K-1));

    // cout << ret[N - (K-1)-1];

    cout << ret;

}