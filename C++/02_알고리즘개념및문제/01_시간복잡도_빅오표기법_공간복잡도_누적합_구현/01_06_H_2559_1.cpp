#include <bits/stdc++.h>
using namespace std;

/**
 * N : 1 ~ 100000
 * K : 1 ~ 100000 -  1 (왜냐면, n사이 값이라고 했음.)
 * 온도는 -100 ~ 100
 * 연속의 온도의 합이 "최대" 되는 값 : 구간합 prefix sum, psum[i] = psum[i-1] + a[i];
 * 이 문제의 최솟값은???
 *  최악의 경우, -100 * 100000 - 1 ... = -10000000
 * 최댓값은 어디서부터?
*/

/**
 * 문제에서 최댓값을 구하라고 했다면,
 * 최솟값부터 최댓값을 구하라.
 *  ret = max(ret, value);
 * 최솟값을 구하라고 했다면,
 * 최댓값부터 최솟값을 구하라.
 *  ret = min(ret, value);
*/

typedef long long ll;
int n, k, temp, psum[100001], ret = -10000004;

int main(){
    ios_base::sync_with_stdio(false);
    cin.tie(NULL); cout.tie(NULL);

    cin >> n >> k;

    for(int i = 1; i <= n; i++){
        cin >> temp;
        psum[i] = psum[i-1] + temp;
    }
    for(int i = k; i <= n; i++){
        ret = max(ret, psum[i] - psum[i-k]);
    }

    cout << ret << "\n";

    return 0;
}