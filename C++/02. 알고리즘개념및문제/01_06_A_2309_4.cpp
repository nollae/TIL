#include <bits/stdc++.h>
using namespace std;

/**
 * 재귀를 이용한 순열을 통해 구현하였다.
*/

int a[9];
int n = 9, r = 7;

void print(){
    int sum = 0;
    for(int i = 0; i < r; i++){
        sum += a[i];
    }
    if(sum == 100){
        sort(a, a+7);
        for(int i = 0; i < r; i++) cout << a[i] << " ";
        exit(0);
    }
}

void makePermutation(int n, int r, int depth){
    if(r == depth){
        print();
        return;
    }

    for(int i = depth; i < n; i++){
        swap(a[i], a[depth]);
        makePermutation(n, r, depth +1);
        swap(a[i], a[depth]);
    }
}


int main(){
    for(int i = 0; i < 9; i++){
        cin >> a[i];
    }
    makePermutation(n, r, 0);
}