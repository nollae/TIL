#include <bits/stdc++.h>
using namespace std;

/**
 * 재귀를 이용한 조합을 통해 구현하였다.
*/

int a[9];

void print(vector<int> v){
    int sum = 0;
    for(int i : v) sum += i;
    if(sum == 100){
        sort(v.begin(), v.end());
        for(int j : v) cout << j << " ";
        exit(0);
    }
}

void combi(int start, vector<int> v){

    if(v.size() == 7){
        print(v);
        return;
    }

    for(int i = start + 1; i < 9; i++){
        v.push_back(a[i]);
        combi(i, v);
        v.pop_back();
    }
}

int main(){
    vector<int> v;

    for(int i = 0; i < 9; i++){
        cin >> a[i];
    }

    combi(-1, v);
}