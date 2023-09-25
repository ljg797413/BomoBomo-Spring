
$(document).ready(function () {
    showServiceReviewList(1,getSearchReviewVo());

});


//페이징처리된 숫자 클릭 시 해당 데이터를 가져와서 비동기 페이징처리
$(document).on('click', '.page-num a', function (e) {
    e.preventDefault();
    const page = $(this).data('reviewnum');
    showServiceReviewList(page,getSearchReviewVo());

});

//검색 버튼 클릭 시 검색결과 화면에 표시를하며 동시에 페이징처리
$('.sitter-search-btn>button' ).on('click', function (){

    showServiceReviewList(1, getSearchReviewVo());


})



function getSearchReviewVo(){
    let cate = $('.cate').val();
    let keyword = $('.keyword').val();

    console.log(cate);
    console.log(keyword);

    return{
        cate : cate,
        keyword : keyword
    };
}


function showServiceReviewList(page, searchReviewVo){

    $.ajax({

        url:`/reviews/service/${page}`,
        type:'get',
        data: searchReviewVo,
        dataType:'json',
        success :function (result){
            console.log(result.pageReviewVo);
            console.log(result.serviceReviewList);

            serviceReviewList(result)


        }, error :
        function (a,b,c){
            console.error(c);
        }

    });
}


function serviceReviewList(result) {
    let text = '';

    if(result.serviceReviewList.length !=0){
        result.serviceReviewList.forEach(r => {

            text += `
                
                <li>
                    <a href="/board/reviewDetail?sitterBoardNumber=${r.sitterBoardNumber}">
                        <div class="review-sitter-img">
                            <img src="/common/img/보모사진1.jpg" alt="리뷰 보모사진"/>
                        </div>
                        <div class="review-sitter-content">
                            <p><strong>${r.empName}</strong></p>
                            <div class="review-score">
                                <img src="/common/img/star.png"><span> ${r.rating} / 5</span>
                            </div>
                        </div>
                        <div class="reivew-text-content">
                            <dl>
                                <dt><strong>${r.userId}</strong></dt>
                                <dd>
                                    <p>
                                        ${r.sitterBoardContent}
                                    </p>
                                </dd>
                            </dl>
                        </div>
                    </a>
                </li>
            `;
        });
        }else{
            text=`

                    <h3 class="non-review-search-result">검색 결과가 없습니다. 시터님 정보를 다시 확인해주세요.<br>
                            <a href="/board/serviceReview">목록으로 돌아가기</a></h3>

            `;
        }

    $('.review-ul').html(text);
    //동시에 페이징처리
    updatePagination(result.pageReviewVo);
}


//페이징처리
function updatePagination(pageReviewVo) {
    let $pagenation = $('.review-pagenation-container ul');
    $pagenation.empty();

    if (pageReviewVo.prev) {
        $pagenation.append(`
                <li class="page-num"><a href="#" data-reviewnum="${pageReviewVo.startPage-1}">&lt;</a></li>
            `);
    }

    for (let page = pageReviewVo.startPage; page <= pageReviewVo.endPage; page++) {
        $pagenation.append(`
                    <li class="page-num "><a href="#" class="on" data-reviewnum="${page}">${page}</a></li>
                `);

    }
    if (pageReviewVo.next) {
        $pagenation.append(`
            <li class="page-num"> <a href="#" data-reviewnum="${pageReviewVo.endPage+1}">&gt;</a></li>
            `);
    }
}