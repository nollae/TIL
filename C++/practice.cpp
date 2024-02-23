#include <bits/stdc++.h>
using namespace std;

const int n = 10;
vector<int> a[n];
int visited[n];

void go(int from){
    visited[from] = 1;
    cout << from << " ";

    for(int i : a[from]){
        if(visited[i]) continue;
        go(i);
    }
}

int main(){
    a[1].push_back(2);
    a[1].push_back(3);

    a[2].push_back(1);

    a[3].push_back(1);
    a[3].push_back(4);

    a[4].push_back(3);

    for(int i = 0; i < n; i++){
        if(a[i].size() && visited[i] == 0) go(i);
    }

}