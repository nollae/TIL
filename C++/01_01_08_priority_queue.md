## priority_queue
우선순위 큐는 각 요소에 어떠한 우선순위가 추가로 부여되어있는 컨테이너를 말한다.

우선순위 큐에서 우선순위가 높은 요소는 우선순의가 낮은 요소보다 먼저 제공된다.

일부 구현에서 두 요소이 우선 순위가 같으면 대기열에 포함된 순서에 따라 제공된다. 다른 구현에서 동일한 우선 순위를 가진 요소의 순서는 정의되지 않은 상태로 유지된다.

(참고) 힙은 완전이진트리로 최소힙 또는 최대힙이 있으며 삽입, 삭제, 탐색, 수정에 대해 O(logN)의 시간복잡도를 가진다. 최대힙은 루트 노드에 최대값이 있고, 최소힙은 루트노드에 최소값이 있는 힙을 말한다.

### int형 우선순위큐
greater<타입> 오름차순, less<타입> 내림차순으로 바꿀 수 있다. 기본값은 내림차순이다.

### 구조체를 담은 우선순위큐

```c++
#include <bits/stdc++.h>
using namespace std;

struct Point{
    int y, x;
    Point(int y, int x) : y(y), x(x){}
    Point(){y=-1; x=-1;}
    bool operator < (const Point &a) const{
        return x > a.x;
    }
};

priority_queue<Point> pq;

int main(){
    pq.push({1, 1}); pq.push({2, 2}); pq.push({3, 3}); pq.push({4, 4}); pq.push({5, 5}); pq.push({6, 6});
    cout << pq.top().x << "\n"; 
    return 0;
}
```
내림차순으로 출력이 되어데 아니다. 이는 우선순위 큐에 커스텀 정렬을 넣을 때 반대로 넣어야 하는 특징 때문이다.

```c++
#include <bits/stdc++.h>
using namespace std;

struct Point{
    int y, x;
    Point(int y, int x) : y(y), x(x){}
    Point(){y=-1; x=-1;}
    bool operator < (const Point &a) const{
        return x < a.x;
    }
};

priority_queue<Point> pq;

int main(){
    pq.push({1, 1}); pq.push({2, 2}); pq.push({3, 3}); pq.push({4, 4}); pq.push({5, 5}); pq.push({6, 6});
    cout << pq.top().x << "\n"; 
    return 0;
}
```
가장 최소를 출력하는 로직이라면 > , 최대라면 < 이런식으로 설정하면 된다.