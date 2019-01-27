

//Lưới dữ liệu 1 tầng
var TomaNamGrid = function (NameGrid) {

    var checkedIds = {};   
    //#region Xử lý Grid dữ liệu
    var grid = $('#' + NameGrid + '').kendoGrid({
        messages: {
            noRows: 'Không có dữ liệu'
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 10,
            pageSizes: [10, 20]
        },        
        filterable: {
            mode: "row",
            operators: {
                string: {
                    eq: "Bằng",
                    neq: "Khác",
                    startswith: "Bắt đầu với...",
                    contains: "Chứa",
                    doesnotcontain: "Không chứa",
                    endswith: "Cuối cùng với...",
                },
                date: {
                    eq: "Bằng",
                    neq: "Khác",
                    gt: "Sau ngày",
                    lte: "Trước ngày"
                },
                number: {
                    eq: "Bằng",
                    neq: "Khác",
                    gte: "Lớn hơn hoặc bằng",
                    gt: "Lớn hơn",
                    lte: "Nhỏ hơn hoặc bằng",
                    lt: "Nhỏ hơn"
                },
                enums: {
                    eq: "Bằng",
                    neq: "Khác"
                }
            },
            messages: {
                info: "Chọn kiểu lọc: ",
                and: "và",
                or: "hoặc",
                filter: "Áp dụng",
                clear: "Hủy Lọc",
                isFalse: "Sai",
                isTrue: "Đúng",
                search: "Tìm kiếm",
                selectValue: "Chọn",
                cancel: "Hủy",
                selectedItemsFormat: "Có {0} các mục đã chọn",
                operator: "chọn kiểu lọc",
                value: "chọn giá trị"
            }
        },
        sortable: true,
        columnMenu: {
            messages: { //customize the text
                sortAscending: "Sắp xếp tăng dần",
                sortDescending: "Sắp xếp giảm dần",
                filter: "Lọc",
                columns: "Chọn cột hiển thị"
            },
            columns: true, //enable columns section
            sortable: false, //enable sorting section
            filterable: false //enable filterable section
        },
    }).data('kendoGrid');
    
    //#endregion
    return {        
        CofigGrid: function (x, y, z,a) {
            grid.setOptions({
                dataBound: function () {
                    if (x) {
                        for (var i = 0; i < this.columns.length; i++) {
                            grid.autoFitColumn(i);
                        }
                    }
                    ///////////////////////
                    var view = grid.dataSource.view();
                    for (var i = 0; i < view.length; i++) {
                        if (checkedIds[view[i].ID]) {
                            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                                .addClass("k-state-selected")
                                .find(".k-checkbox")
                                .attr("checked", "checked");
                        }
                    }
                },
                columns: y,
                dataSource: {
                    error: function (e) {
                        checkSessionExpire(e, returnPage);
                        Notify(
                            'Không load được danh sách...',
                            'bottom-right',
                            '5000',
                            'danger',
                            'fa-warning',
                            true
                        );
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 10,
                    schema: {
                        data: "Data",
                        total: "Total"
                    },
                    group: a,
                    transport: {
                        parameterMap: function (data, operation) {
                            if (data.models) {
                                //alert("1" + JSON.stringify({ products: data.models }));
                                return JSON.stringify({ products: data.models });
                            } else if (operation == "read") {
                                //Page methods always need values for their parameters
                                data = $.extend({ sort: null, filter: null }, data);
                                //alert("2" + JSON.stringify(data));
                                return JSON.stringify(data);
                            }
                        },
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: "POST",
                            url: z
                        }
                    }
                }
            });


            //bind click event to the checkbox
            grid.table.on("click", ".k-checkbox", function () {
                var checked = this.checked,
                     row = $(this).closest("tr"),
                     dataItem = grid.dataItem(row);

                checkedIds[dataItem.ID] = checked;
                if (checked) {
                    //-select the row
                    row.addClass("k-state-selected");
                } else {
                    //-remove selection
                    row.removeClass("k-state-selected");
                }
            });
            $('#header-chb').change(function (ev) {

                var checked = ev.target.checked;
                $('.row-checkbox').each(function (idx, item) {
                    if (checked) {
                        if (!($(item).closest('tr').is('.k-state-selected'))) {
                            $(item).click();
                        }
                    } else {
                        if ($(item).closest('tr').is('.k-state-selected')) {
                            $(item).click();
                        }
                    }
                });
            });
        },

        CofigGridWithPara: function (x, y, z, param) {
            
            grid.setOptions({
                dataBound: function () {
                    if (x) {
                        for (var i = 0; i < this.columns.length; i++) {
                            grid.autoFitColumn(i);
                        }
                    }
                    ///////////////////////
                    var view = grid.dataSource.view();
                    for (var i = 0; i < view.length; i++) {
                        if (checkedIds[view[i].ID]) {
                            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                                .addClass("k-state-selected")
                                .find(".k-checkbox")
                                .attr("checked", "checked");
                        }
                    }
                },
                columns: y,
                dataSource: {
                    error: function (e) {
                        alert(JSON.stringify(e));
                        checkSessionExpire(e, returnPage);
                        Notify(
                            'Không load được danh sách...',
                            'bottom-right',
                            '5000',
                            'danger',
                            'fa-warning',
                            true
                        );
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 10,
                    schema: {
                        data: "d.Data",
                        total: "d.Total"
                    },
                    transport: {
                        parameterMap: function (data, operation) {
                            if (data.models) {
                                return JSON.stringify({ products: data.models });
                            } else if (operation == "read") {
                                //Page methods always need values for their parameters
                                data = $.extend({ sort: null, filter: null }, data);
                                return JSON.stringify(data);
                            }
                        },
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: "POST",
                            url: z,
                            data: param
                        }
                    }
                }
            });


            //bind click event to the checkbox
            grid.table.on("click", ".k-checkbox", function () {
                var checked = this.checked,
                     row = $(this).closest("tr"),
                     dataItem = grid.dataItem(row);

                checkedIds[dataItem.ID] = checked;
                if (checked) {
                    //-select the row
                    row.addClass("k-state-selected");
                } else {
                    //-remove selection
                    row.removeClass("k-state-selected");
                }
            });
            $('#header-chb').change(function (ev) {

                var checked = ev.target.checked;
                $('.row-checkbox').each(function (idx, item) {
                    if (checked) {
                        if (!($(item).closest('tr').is('.k-state-selected'))) {
                            $(item).click();
                        }
                    } else {
                        if ($(item).closest('tr').is('.k-state-selected')) {
                            $(item).click();
                        }
                    }
                });
            });
        },

        Read: function () {
            grid.dataSource.read();
        },
        GetListID: function () {
            var checked = [];
            for (var i in checkedIds) {
                if (checkedIds[i]) {
                    checked.push(i);
                }
            }
            return checked;
        },
        ClearSelect: function () {
            checkedIds = {};
            $('.row-checkbox').each(function (idx, item) {
                if ($(item).closest('tr').is('.k-state-selected')) {
                    $(item).click();
                }
            });
        },
        SelectRowbyID: function (Id) {
            var UID = "";
            for (var i = 0; i < $("#" + NameGrid + "").data("kendoGrid").dataSource.data().length; i++) {
                if ($("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i].ID === Id) {
                    UID = $("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i].uid;
                }
            }
            $("#" + NameGrid + "").data("kendoGrid").tbody.find("tr[data-uid='" + UID + "']")
                .addClass("k-state-selected")
                .find(".k-checkbox")
                .attr("checked", "checked");

            checkedIds[Id] = true;
        },
        GetItembyID: function (Id) {
            var item = [];
            for (var i = 0; i < $("#" + NameGrid + "").data("kendoGrid").dataSource.data().length; i++) {
                if ($("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i].ID === Id) {
                    item = $("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i];
                }
            }
            return item;
        },
        GetAllItem: function () {
            var item1 = [];
            //for (var i = 0; i < $("#" + NameGrid + "").data("kendoGrid").dataSource.data().length; i++) {
                    item1 = $("#" + NameGrid + "").data("kendoGrid").dataSource.data();
            //}
            return item1;
        },
        AjaxManyRows: function (ListID, Url, Module)
        {
            function deleteMultiRows(id, dObj)
            {
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ ID: id }),
                    dataType: 'json',
                    success: function () {
                        dObj.resolve();
                    },
                    fail: function(){
                        dObj.reject();
                    },
                    type: 'POST',
                    url: Url
                });
            }
            //alert(ArrayCache);
            var arrayDeferred = [];
            for (var i = 0; i < ListID.length; i++) {
                var dObj = new $.Deferred();
                arrayDeferred.push(dObj);
                deleteMultiRows(parseInt(ListID[i]), dObj);
            }
            $.when.apply($, arrayDeferred).done(function () {
                Notify(
                    'Cập nhật thành công',
                     'bottom-right',
                      '5000',
                      'success',
                      'fa-check',
                       true
                       );
                Module.ClearSelect();
                Module.Read();
            })
            $.when.apply($, arrayDeferred).fail(function () {
                Notify(function (e) {
                    'Lỗi'+e,
                     'bottom-right',
                      '5000',
                      'fail',
                      'fa-check',
                       true
                });
            });
        },
        CheckExistWithPara: function (Url, NameField, Value, param, Func) {

            let db_filter = new kendo.data.DataSource({
                error: function (e) {
                    alert(JSON.stringify( e));
                    checkSessionExpire(e, returnPage);
                    Notify(
                        'Không load được danh sách...',
                        'bottom-right',
                        '5000',
                        'danger',
                        'fa-warning',
                        true
                    );
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
                schema: {
                    data: "d.Data",
                    total: "d.Total"
                },
                transport: {
                    parameterMap: function (data, operation) {
                        if (data.models) {
                            return JSON.stringify({ products: data.models });
                        } else if (operation == "read") {
                            //Page methods always need values for their parameters
                            data = $.extend({ sort: null, filter: null }, data);
                            return JSON.stringify(data);
                        }
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: "POST",
                        url: Url,
                        data: param
                    }
                },
                filter: { logic: "and", filters: [{ field: "" + NameField + "", operator: "eq", value: Value }] }
            });
            db_filter.fetch(function () {
                var view = db_filter.view();
                if (view.length > 0) {
                    Func(false);
                }
                else {
                    Func(true);
                }
            });

        },
        CheckExist: function (Url, NameField, Value, Func) {

        let db_filter = new kendo.data.DataSource({
            error: function (e) {
                checkSessionExpire(e, returnPage);
                Notify(
                    'Không load được danh sách...',
                    'bottom-right',
                    '5000',
                    'danger',
                    'fa-warning',
                    true
                );
            },
            serverPaging: true,
            serverSorting: true,
            serverFiltering: true,
            pageSize: 10,
            schema: {
                data: "d.Data",
                total: "d.Total"
            },
            transport: {
                parameterMap: function (data, operation) {
                    if (data.models) {
                        return JSON.stringify({ products: data.models });
                    } else if (operation == "read") {
                        //Page methods always need values for their parameters
                        data = $.extend({ sort: null, filter: null }, data);
                        return JSON.stringify(data);
                    }
                },
                read: {
                    contentType: "application/json; charset=utf-8",
                    dataType: 'json',
                    type: "POST",
                    url: Url,
                    //data: param
                }
            },
            filter: { logic: "and", filters: [{ field: "" + NameField + "", operator: "eq", value: Value }] }
        });
        db_filter.fetch(function () {
            var view = db_filter.view();
            if (view.length > 0) {
                Func(false);
            }
            else {
                Func(true);
            }
        });

    }
    }
}

//Lưới dữ liệu 2 tầng
var TomaNamGrid2Tiers = function (NameGrid) {
    var checkedIds = {};
    //#region Xử lý Grid dữ liệu
    var grid = $('#' + NameGrid + '').kendoGrid({
        messages: {
            noRows: 'Không có dữ liệu'
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 10,
            pageSizes: [10, 20]
        },
        filterable: {
            mode: "row",
            operators: {
                string: {
                    eq: "Bằng",
                    neq: "Khác",
                    startswith: "Bắt đầu với...",
                    contains: "Chứa",
                    doesnotcontain: "Không chứa",
                    endswith: "Cuối cùng với...",
                },
                date: {
                    eq: "Bằng",
                    neq: "Khác",
                    gt: "Sau ngày",
                    lte: "Trước ngày"
                },
                number: {
                    eq: "Bằng",
                    neq: "Khác",
                    gte: "Lớn hơn hoặc bằng",
                    gt: "Lớn hơn",
                    lte: "Nhỏ hơn hoặc bằng",
                    lt: "Nhỏ hơn"
                },
                enums: {
                    eq: "Bằng",
                    neq: "Khác"
                }
            },
            messages: {
                info: "Chọn kiểu lọc: ",
                and: "và",
                or: "hoặc",
                filter: "Áp dụng",
                clear: "Hủy Lọc",
                isFalse: "Sai",
                isTrue: "Đúng",
                search: "Tìm kiếm",
                selectValue: "Chọn",
                cancel: "Hủy",
                selectedItemsFormat: "Có {0} các mục đã chọn",
                operator: "chọn kiểu lọc",
                value: "chọn giá trị"
            }
        },
        sortable: true,
        columnMenu: {
            messages: { //customize the text
                sortAscending: "Sắp xếp tăng dần",
                sortDescending: "Sắp xếp giảm dần",
                filter: "Lọc",
                columns: "Chọn cột hiển thị"
            },
            columns: true, //enable columns section
            sortable: false, //enable sorting section
            filterable: false //enable filterable section
        },
    }).data('kendoGrid');

    //#endregion
    return {
        CofigGridWithParam: function (
                FitColumn_Main,
                Columns_Main,
                Url_Main,
                Group_Main,
                DetailTemplate_Name,
                CapTion_Tab_1,
                Url_Grid_Detail_1,
                Columns_Grid_Detail_1,
                CapTion_Tab_2,
                Url_Grid_Detail_2,
                Columns_Grid_Detail_2,
                Param
            ) {
            grid.setOptions({
                dataBound: function () {
                    if (FitColumn_Main) {
                        for (var i = 0; i < this.columns.length; i++) {
                            grid.autoFitColumn(i);
                        }
                    }
                    ///////////////////////
                    var view = grid.dataSource.view();
                    for (var i = 0; i < view.length; i++) {
                        if (checkedIds[view[i].ID]) {
                            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                                .addClass("k-state-selected")
                                .find(".k-checkbox")
                                .attr("checked", "checked");
                        }
                    }
                },
                columns: Columns_Main,
                dataSource: {
                    error: function (e) {
                        checkSessionExpire(e, returnPage);
                        Notify(
                            'Không load được danh sách...',
                            'bottom-right',
                            '5000',
                            'danger',
                            'fa-warning',
                            true
                        );
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 10,
                    schema: {
                        data: "Data",
                        total: "Total"
                    },
                    group: Group_Main,
                    transport: {
                        parameterMap: function (data, operation) {
                            if (data.models) {
                                return JSON.stringify({ products: data.models });
                            } else if (operation == "read") {
                                //Page methods always need values for their parameters
                                data = $.extend({ sort: null, filter: null }, data);
                                return JSON.stringify(data);
                            }
                        },
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: "POST",
                            url: Url_Main,
                            data: Param
                        }
                    }
                },

                detailTemplate: kendo.template($("#" + DetailTemplate_Name + "").html()),
                detailExpand: function (e) {
                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                },
                detailInit: function (e) {

                    var detailRow = e.detailRow;

                    var d = { ID: e.data.ID };
                    var p = $.extend(Param, d); // ghep json string
                    //alert(JSON.stringify(p));

                    detailRow.find("#tabstrip").kendoTabStrip({
                        animation: {
                            open: { effects: "fadeIn" }
                        },
                        select: function (select) {
                            var content_tab = $(select.item).find("> .k-link").text().trim();
                            switch (content_tab) {
                                case CapTion_Tab_1:
                                   
                                    grid_detail_1.dataSource.read();

                                    break;

                                case CapTion_Tab_2:
                                   
                                    var grid_detail_2 = detailRow.find("#grid_detail_2").kendoGrid({
                                        pageable: {
                                            buttonCount: 3,
                                            input: true,
                                            messages: {
                                                display: 'Dòng {0} - {1} / {2} dòng',
                                                empty: 'Không có dữ liệu',
                                                first: 'Trang đầu',
                                                itemsPerPage: 'dòng / trang',
                                                last: 'Trang cuối',
                                                next: 'Trang sau',
                                                of: '/ {0} trang',
                                                page: 'Trang',
                                                previous: 'Trang trước'
                                            },
                                            pageSize: 10,
                                            pageSizes: [10, 20]
                                        },
                                        dataSource: {
                                            error: function (e) {
                                                checkSessionExpire(e, returnPage);
                                                Notify(
                                                    'Không load được danh sách...',
                                                    'bottom-right',
                                                    '5000',
                                                    'danger',
                                                    'fa-warning',
                                                    true
                                                );
                                            },
                                            serverPaging: true,
                                            serverSorting: true,
                                            serverFiltering: true,
                                            pageSize: 10,
                                            schema: {
                                                data: "Data",
                                                total: "Total"
                                            },
                                            transport: {
                                                parameterMap: function (data, operation) {
                                                    if (data.models) {
                                                        return JSON.stringify({ products: data.models });
                                                    } else if (operation == "read") {
                                                        //Page methods always need values for their parameters
                                                        data = $.extend({ sort: null, filter: null }, data);
                                                        return JSON.stringify(data);
                                                    }
                                                },
                                                read: {
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: 'json',
                                                    type: "POST",
                                                    url: Url_Grid_Detail_2,
                                                    data: p
                                                }
                                            }
                                        },
                                        columns: Columns_Grid_Detail_2,
                                        dataBound: function () {
                                            if (grid_detail_2.dataSource.data().length > 0) {

                                                $('#grid_detail_2 .k-grid-header').show();

                                                //for (var a = 0; a < grid_detail_2.columns.length; a++) {
                                                //    grid_detail_2.autoFitColumn(a);
                                                //}
                                            }
                                            else {
                                                $('#grid_detail_2 .k-grid-header').hide();
                                            }
                                        }
                                    }).data("kendoGrid");


                                    break;
                            }
                        }
                    });

                    var grid_detail_1 = detailRow.find("#grid_detail_1").kendoGrid({
                        pageable: {
                            buttonCount: 3,
                            input: true,
                            messages: {
                                display: 'Dòng {0} - {1} / {2} dòng',
                                empty: 'Không có dữ liệu',
                                first: 'Trang đầu',
                                itemsPerPage: 'dòng / trang',
                                last: 'Trang cuối',
                                next: 'Trang sau',
                                of: '/ {0} trang',
                                page: 'Trang',
                                previous: 'Trang trước'
                            },
                            pageSize: 10,
                            pageSizes: [10, 20]
                        },
                        dataSource: {
                            error: function (e) {
                                checkSessionExpire(e, returnPage);
                                Notify(
                                    'Không load được danh sách...',
                                    'bottom-right',
                                    '5000',
                                    'danger',
                                    'fa-warning',
                                    true
                                );
                            },
                            serverPaging: true,
                            serverSorting: true,
                            serverFiltering: true,
                            pageSize: 10,
                            schema: {
                                data: "d.Data",
                                total: "d.Total"
                            },
                            transport: {
                                parameterMap: function (data, operation) {
                                    if (data.models) {
                                        return JSON.stringify({ products: data.models });
                                    } else if (operation == "read") {
                                        //Page methods always need values for their parameters
                                        data = $.extend({ sort: null, filter: null }, data);
                                        return JSON.stringify(data);
                                    }
                                },
                                read: {
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    type: "POST",
                                    url: Url_Grid_Detail_1,
                                    data: p
                                }
                            }
                        },
                        columns: Columns_Grid_Detail_1,
                        dataBound: function () {
                            if (grid_detail_1.dataSource.data().length > 0) {
                                $('#grid_detail_1 .k-grid-header').show();
                                //for (var i = 0; i < this.columns.length; i++) {
                                //    grid_detail_1.autoFitColumn(i);
                                //}
                            }
                            else {
                                $('#grid_detail_1 .k-grid-header').hide();
                            }
                        }
                    }).data("kendoGrid");
                }
            });

            //bind click event to the checkbox
            grid.table.on("click", ".k-checkbox", function () {
                var checked = this.checked,
                     row = $(this).closest("tr"),
                     dataItem = grid.dataItem(row);

                checkedIds[dataItem.ID] = checked;
                if (checked) {
                    //-select the row
                    row.addClass("k-state-selected");
                } else {
                    //-remove selection
                    row.removeClass("k-state-selected");
                }
            });
            $('#header-chb').change(function (ev) {

                var checked = ev.target.checked;
                $('.row-checkbox').each(function (idx, item) {
                    if (checked) {
                        if (!($(item).closest('tr').is('.k-state-selected'))) {
                            $(item).click();
                        }
                    } else {
                        if ($(item).closest('tr').is('.k-state-selected')) {
                            $(item).click();
                        }
                    }
                });
            });
        },

        CofigGrid: function (
                FitColumn_Main,
                Columns_Main,
                Url_Main,
                Group_Main,
                DetailTemplate_Name,
                CapTion_Tab_1,
                Url_Grid_Detail_1,
                Columns_Grid_Detail_1,
                CapTion_Tab_2,
                Url_Grid_Detail_2,
                Columns_Grid_Detail_2
            ) {
            grid.setOptions({
                dataBound: function () {
                    if (FitColumn_Main) {
                        for (var i = 0; i < this.columns.length; i++) {
                            grid.autoFitColumn(i);
                        }
                    }
                    ///////////////////////
                    var view = grid.dataSource.view();
                    for (var i = 0; i < view.length; i++) {
                        if (checkedIds[view[i].ID]) {
                            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                                .addClass("k-state-selected")
                                .find(".k-checkbox")
                                .attr("checked", "checked");
                        }
                    }
                },
                columns: Columns_Main,
                dataSource: {
                    error: function (e) {
                        checkSessionExpire(e, returnPage);
                        Notify(
                            'Không load được danh sách...',
                            'bottom-right',
                            '5000',
                            'danger',
                            'fa-warning',
                            true
                        );
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 10,
                    schema: {
                        data: "d.Data",
                        total: "d.Total"
                    },
                    group: Group_Main,
                    transport: {
                        parameterMap: function (data, operation) {
                            if (data.models) {
                                return JSON.stringify({ products: data.models });
                            } else if (operation == "read") {
                                //Page methods always need values for their parameters
                                data = $.extend({ sort: null, filter: null }, data);
                                return JSON.stringify(data);
                            }
                        },
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: "POST",
                            url: Url_Main
                        }
                    }
                },

                detailTemplate: kendo.template($("#" + DetailTemplate_Name + "").html()),
                detailExpand: function (e) {
                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                },
                detailInit: function (e) {

                    var detailRow = e.detailRow;

                    detailRow.find("#tabstrip").kendoTabStrip({
                        animation: {
                            open: { effects: "fadeIn" }
                        },
                        select: function (select) {
                            var content_tab = $(select.item).find("> .k-link").text().trim();
                            switch (content_tab) {
                                case CapTion_Tab_1:
                                   
                                    grid_detail_1.dataSource.read();

                                    break;

                                case CapTion_Tab_2:

                                   
                                    var grid_detail_2 = detailRow.find("#grid_detail_2").kendoGrid({
                                        pageable: {
                                            buttonCount: 3,
                                            input: true,
                                            messages: {
                                                display: 'Dòng {0} - {1} / {2} dòng',
                                                empty: 'Không có dữ liệu',
                                                first: 'Trang đầu',
                                                itemsPerPage: 'dòng / trang',
                                                last: 'Trang cuối',
                                                next: 'Trang sau',
                                                of: '/ {0} trang',
                                                page: 'Trang',
                                                previous: 'Trang trước'
                                            },
                                            pageSize: 10,
                                            pageSizes: [10, 20]
                                        },
                                        dataSource: {
                                            error: function (e) {
                                                checkSessionExpire(e, returnPage);
                                                Notify(
                                                    'Không load được danh sách...',
                                                    'bottom-right',
                                                    '5000',
                                                    'danger',
                                                    'fa-warning',
                                                    true
                                                );
                                            },
                                            serverPaging: true,
                                            serverSorting: true,
                                            serverFiltering: true,
                                            pageSize: 10,
                                            schema: {
                                                data: "d.Data",
                                                total: "d.Total"
                                            },
                                            transport: {
                                                parameterMap: function (data, operation) {
                                                    if (data.models) {
                                                        return JSON.stringify({ products: data.models });
                                                    } else if (operation == "read") {
                                                        //Page methods always need values for their parameters
                                                        data = $.extend({ sort: null, filter: null }, data);
                                                        return JSON.stringify(data);
                                                    }
                                                },
                                                read: {
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: 'json',
                                                    type: "POST",
                                                    url: Url_Grid_Detail_2,
                                                    data: { ID: e.data.ID }
                                                }
                                            }
                                        },
                                        columns: Columns_Grid_Detail_2,
                                        dataBound: function () {
                                            if (grid_detail_2.dataSource.data().length > 0) {

                                                $('#grid_detail_2 .k-grid-header').show();

                                                //for (var a = 0; a < grid_detail_2.columns.length; a++) {
                                                //    grid_detail_2.autoFitColumn(a);
                                                //}
                                            }
                                            else {
                                                $('#grid_detail_2 .k-grid-header').hide();
                                            }
                                        }
                                    }).data("kendoGrid");


                                    break;
                            }
                        }
                    });

                    var grid_detail_1 = detailRow.find("#grid_detail_1").kendoGrid({
                        pageable: {
                            buttonCount: 3,
                            input: true,
                            messages: {
                                display: 'Dòng {0} - {1} / {2} dòng',
                                empty: 'Không có dữ liệu',
                                first: 'Trang đầu',
                                itemsPerPage: 'dòng / trang',
                                last: 'Trang cuối',
                                next: 'Trang sau',
                                of: '/ {0} trang',
                                page: 'Trang',
                                previous: 'Trang trước'
                            },
                            pageSize: 10,
                            pageSizes: [10, 20]
                        },
                        dataSource: {
                            error: function (e) {
                                checkSessionExpire(e, returnPage);
                                Notify(
                                    'Không load được danh sách...',
                                    'bottom-right',
                                    '5000',
                                    'danger',
                                    'fa-warning',
                                    true
                                );
                            },
                            serverPaging: true,
                            serverSorting: true,
                            serverFiltering: true,
                            pageSize: 10,
                            schema: {
                                data: "d.Data",
                                total: "d.Total"
                            },
                            transport: {
                                parameterMap: function (data, operation) {
                                    if (data.models) {
                                        return JSON.stringify({ products: data.models });
                                    } else if (operation == "read") {
                                        //Page methods always need values for their parameters
                                        data = $.extend({ sort: null, filter: null }, data);
                                        return JSON.stringify(data);
                                    }
                                },
                                read: {
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    type: "POST",
                                    url: Url_Grid_Detail_1,
                                    data: { ID: e.data.ID }
                                }
                            }
                        },
                        columns: Columns_Grid_Detail_1,
                        dataBound: function () {
                            if (grid_detail_1.dataSource.data().length > 0) {
                                $('#grid_detail_1 .k-grid-header').show();
                                //for (var i = 0; i < this.columns.length; i++) {
                                //    grid_detail_1.autoFitColumn(i);
                                //}
                            }
                            else {
                                $('#grid_detail_1 .k-grid-header').hide();
                            }
                        }
                    }).data("kendoGrid");
                }
            });


            //bind click event to the checkbox
            grid.table.on("click", ".k-checkbox", function () {
                var checked = this.checked,
                     row = $(this).closest("tr"),
                     dataItem = grid.dataItem(row);

                checkedIds[dataItem.ID] = checked;
                if (checked) {
                    //-select the row
                    row.addClass("k-state-selected");
                } else {
                    //-remove selection
                    row.removeClass("k-state-selected");
                }
            });
            $('#header-chb').change(function (ev) {

                var checked = ev.target.checked;
                $('.row-checkbox').each(function (idx, item) {
                    if (checked) {
                        if (!($(item).closest('tr').is('.k-state-selected'))) {
                            $(item).click();
                        }
                    } else {
                        if ($(item).closest('tr').is('.k-state-selected')) {
                            $(item).click();
                        }
                    }
                });
            });
        },
        Read: function () {
            grid.dataSource.read();
        },
        GetListID: function () {
            var checked = [];
            for (var i in checkedIds) {
                if (checkedIds[i]) {
                    checked.push(i);
                }
            }
            return checked;
        },
        ClearSelect: function () {
            checkedIds = {};
            $('.row-checkbox').each(function (idx, item) {
                if ($(item).closest('tr').is('.k-state-selected')) {
                    $(item).click();
                }
            });
        },
        SelectRowbyID: function (Id) {
            var UID = "";
            for (var i = 0; i < $("#" + NameGrid + "").data("kendoGrid").dataSource.data().length; i++) {
                if ($("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i].ID === Id) {
                    UID = $("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i].uid;
                }
            }
            $("#" + NameGrid + "").data("kendoGrid").tbody.find("tr[data-uid='" + UID + "']")
                .addClass("k-state-selected")
                .find(".k-checkbox")
                .attr("checked", "checked");

            checkedIds[Id] = true;
        },
        GetItembyID: function (Id) {
            var item = [];
            for (var i = 0; i < $("#" + NameGrid + "").data("kendoGrid").dataSource.data().length; i++) {
                if ($("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i].ID === Id) {
                    item = $("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i];
                }
            }
            return item;
        },
        GetAllItem: function () {
            var item1 = [];
            //for (var i = 0; i < $("#" + NameGrid + "").data("kendoGrid").dataSource.data().length; i++) {
            item1 = $("#" + NameGrid + "").data("kendoGrid").dataSource.data();
            //}
            return item1;
        },
        AjaxManyRows: function (ListID, Url, Module) {
            function deleteMultiRows(id, dObj) {
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ ID: id }),
                    dataType: 'json',
                    success: function () {
                        dObj.resolve();
                    },
                    fail: function () {
                        dObj.reject();
                    },
                    type: 'POST',
                    url: Url
                });
            }            
            var arrayDeferred = [];
            for (var i = 0; i < ListID.length; i++) {
                var dObj = new $.Deferred();
                arrayDeferred.push(dObj);
                deleteMultiRows(parseInt(ListID[i]), dObj);
            }
            $.when.apply($, arrayDeferred).done(function () {
                Notify(
                    'Cập nhật thành công',
                     'bottom-right',
                      '5000',
                      'success',
                      'fa-check',
                       true
                       );
                Module.ClearSelect();
                Module.Read();
            })
            $.when.apply($, arrayDeferred).fail(function () {
                Notify(function (e) {
                    'Lỗi' + e,
                     'bottom-right',
                      '5000',
                      'fail',
                      'fa-check',
                       true
                });
            });
        },
        CheckExist: function (Url, NameField, Value, Func) {

            let db_filter = new kendo.data.DataSource({
                error: function (e) {
                    checkSessionExpire(e, returnPage);
                    Notify(
                        'Không load được danh sách...',
                        'bottom-right',
                        '5000',
                        'danger',
                        'fa-warning',
                        true
                    );
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
                schema: {
                    data: "d.Data",
                    total: "d.Total"
                },
                transport: {
                    parameterMap: function (data, operation) {
                        if (data.models) {
                            return JSON.stringify({ products: data.models });
                        } else if (operation == "read") {
                            //Page methods always need values for their parameters
                            data = $.extend({ sort: null, filter: null }, data);
                            return JSON.stringify(data);
                        }
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: "POST",
                        url: Url
                    }
                },
                filter:
                    {
                        logic: "and",
                        filters: [
                            { field: "" + NameField + "", operator: "eq", value: Value }
                        ]

                    }
            });
            db_filter.fetch(function () {
                var view = db_filter.view();
                if (view.length > 0) {
                    Func(false);

                }
                else {
                    Func(true);

                }
            });

        },
        CheckExistWithPara: function (Url, NameField, Value,Param, Func) {

            let db_filter = new kendo.data.DataSource({
                error: function (e) {
                    checkSessionExpire(e, returnPage);
                    Notify(
                        'Không load được danh sách...',
                        'bottom-right',
                        '5000',
                        'danger',
                        'fa-warning',
                        true
                    );
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
                schema: {
                    data: "d.Data",
                    total: "d.Total"
                },
                transport: {
                    parameterMap: function (data, operation) {
                        if (data.models) {
                            return JSON.stringify({ products: data.models });
                        } else if (operation == "read") {
                            //Page methods always need values for their parameters
                            data = $.extend({ sort: null, filter: null }, data);
                            return JSON.stringify(data);
                        }
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: "POST",
                        url: Url,
                        data: Param
                    }
                },
                filter:
                    {
                        logic: "and",
                        filters: [
                            { field: "" + NameField + "", operator: "eq", value: Value }
                        ]

                    }
            });
            db_filter.fetch(function () {
                var view = db_filter.view();
                if (view.length > 0) {
                    Func(false);

                }
                else {
                    Func(true);

                }
            });

        },
        CheckExist2Field: function (Url, NameField1, Value1, NameField2, Value2, Func) {

            let db_filter = new kendo.data.DataSource({
                error: function (e) {
                    checkSessionExpire(e, returnPage);
                    Notify(
                        'Không load được danh sách...',
                        'bottom-right',
                        '5000',
                        'danger',
                        'fa-warning',
                        true
                    );
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
                schema: {
                    data: "d.Data",
                    total: "d.Total"
                },
                transport: {
                    parameterMap: function (data, operation) {
                        if (data.models) {
                            return JSON.stringify({ products: data.models });
                        } else if (operation == "read") {
                            //Page methods always need values for their parameters
                            data = $.extend({ sort: null, filter: null }, data);
                            return JSON.stringify(data);
                        }
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: "POST",
                        url: Url
                    }
                },
                filter:
                    {
                        logic: "and",
                        filters: [
                            { field: "" + NameField1 + "", operator: "eq", value: Value1 },
                            { field: "" + NameField2 + "", operator: "eq", value: Value2}
                        ]
                    }
            });
            db_filter.fetch(function () {
                var view = db_filter.view();
                if (view.length > 0) {
                    Func(false);
                }
                else {
                    Func(true);
                }
            });

        }

       
    }
}


//Lưới dữ liệu 2 tầng 3 tab
var TomaNamGrid2Tang3Tab = function (NameGrid) {
    var checkedIds = {};
    //#region Xử lý Grid dữ liệu
    var grid = $('#' + NameGrid + '').kendoGrid({
        messages: {
            noRows: 'Không có dữ liệu'
        },
        pageable: {
            buttonCount: 3,
            input: true,
            messages: {
                display: 'Dòng {0} - {1} / {2} dòng',
                empty: 'Không có dữ liệu',
                first: 'Trang đầu',
                itemsPerPage: 'dòng / trang',
                last: 'Trang cuối',
                next: 'Trang sau',
                of: '/ {0} trang',
                page: 'Trang',
                previous: 'Trang trước'
            },
            pageSize: 10,
            pageSizes: [10, 20]
        },
        filterable: {
            mode: "row",
            operators: {
                string: {
                    eq: "Bằng",
                    neq: "Khác",
                    startswith: "Bắt đầu với...",
                    contains: "Chứa",
                    doesnotcontain: "Không chứa",
                    endswith: "Cuối cùng với...",
                },
                date: {
                    eq: "Bằng",
                    neq: "Khác",
                    gt: "Sau ngày",
                    lte: "Trước ngày"
                },
                number: {
                    eq: "Bằng",
                    neq: "Khác",
                    gte: "Lớn hơn hoặc bằng",
                    gt: "Lớn hơn",
                    lte: "Nhỏ hơn hoặc bằng",
                    lt: "Nhỏ hơn"
                },
                enums: {
                    eq: "Bằng",
                    neq: "Khác"
                }
            },
            messages: {
                info: "Chọn kiểu lọc: ",
                and: "và",
                or: "hoặc",
                filter: "Áp dụng",
                clear: "Hủy Lọc",
                isFalse: "Sai",
                isTrue: "Đúng",
                search: "Tìm kiếm",
                selectValue: "Chọn",
                cancel: "Hủy",
                selectedItemsFormat: "Có {0} các mục đã chọn",
                operator: "chọn kiểu lọc",
                value: "chọn giá trị"
            }
        },
        sortable: true,
        columnMenu: {
            messages: { //customize the text
                sortAscending: "Sắp xếp tăng dần",
                sortDescending: "Sắp xếp giảm dần",
                filter: "Lọc",
                columns: "Chọn cột hiển thị"
            },
            columns: true, //enable columns section
            sortable: false, //enable sorting section
            filterable: false //enable filterable section
        },
    }).data('kendoGrid');

    //#endregion
    return {
        CofigGridWithParam: function (
                FitColumn_Main,
                Columns_Main,
                Url_Main,
                Group_Main,
                DetailTemplate_Name,
                CapTion_Tab_1,
                Url_Grid_Detail_1,
                Columns_Grid_Detail_1,
                CapTion_Tab_2,
                Url_Grid_Detail_2,
                Columns_Grid_Detail_2,
                CapTion_Tab_3,
                Url_Grid_Detail_3,
                Columns_Grid_Detail_3,
                Param
            ) {
            grid.setOptions({
                dataBound: function () {
                    if (FitColumn_Main) {
                        for (var i = 0; i < this.columns.length; i++) {
                            grid.autoFitColumn(i);
                        }
                    }
                    ///////////////////////
                    var view = grid.dataSource.view();
                    for (var i = 0; i < view.length; i++) {
                        if (checkedIds[view[i].ID]) {
                            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                                .addClass("k-state-selected")
                                .find(".k-checkbox")
                                .attr("checked", "checked");
                        }
                    }
                },
                columns: Columns_Main,
                dataSource: {
                    error: function (e) {
                        checkSessionExpire(e, returnPage);
                        Notify(
                            'Không load được danh sách...',
                            'bottom-right',
                            '5000',
                            'danger',
                            'fa-warning',
                            true
                        );
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 10,
                    schema: {
                        data: "d.Data",
                        total: "d.Total"
                    },
                    group: Group_Main,
                    transport: {
                        parameterMap: function (data, operation) {
                            if (data.models) {
                                return JSON.stringify({ products: data.models });
                            } else if (operation == "read") {
                                //Page methods always need values for their parameters
                                data = $.extend({ sort: null, filter: null }, data);
                                return JSON.stringify(data);
                            }
                        },
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: "POST",
                            url: Url_Main,
                            data: Param
                        }
                    }
                },

                detailTemplate: kendo.template($("#" + DetailTemplate_Name + "").html()),
                detailExpand: function (e) {
                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                },
                detailInit: function (e) {

                    var detailRow = e.detailRow;

                    var d = { ID: e.data.ID };
                    var p = $.extend(Param, d); // ghep json string
                    //alert(JSON.stringify(p));

                    detailRow.find("#tabstrip").kendoTabStrip({
                        animation: {
                            open: { effects: "fadeIn" }
                        },
                        select: function (select) {
                            var content_tab = $(select.item).find("> .k-link").text().trim();
                            switch (content_tab) {
                                case CapTion_Tab_1:
                                    grid_detail_1.dataSource.read();
                                    break;

                                case CapTion_Tab_2:
                                    var grid_detail_2 = detailRow.find("#grid_detail_2").kendoGrid({
                                        pageable: {
                                            buttonCount: 3,
                                            input: true,
                                            messages: {
                                                display: 'Dòng {0} - {1} / {2} dòng',
                                                empty: 'Không có dữ liệu',
                                                first: 'Trang đầu',
                                                itemsPerPage: 'dòng / trang',
                                                last: 'Trang cuối',
                                                next: 'Trang sau',
                                                of: '/ {0} trang',
                                                page: 'Trang',
                                                previous: 'Trang trước'
                                            },
                                            pageSize: 10,
                                            pageSizes: [10, 20]
                                        },
                                        dataSource: {
                                            error: function (e) {
                                                checkSessionExpire(e, returnPage);
                                                Notify(
                                                    'Không load được danh sách...',
                                                    'bottom-right',
                                                    '5000',
                                                    'danger',
                                                    'fa-warning',
                                                    true
                                                );
                                            },
                                            serverPaging: true,
                                            serverSorting: true,
                                            serverFiltering: true,
                                            pageSize: 10,
                                            schema: {
                                                data: "d.Data",
                                                total: "d.Total"
                                            },
                                            transport: {
                                                parameterMap: function (data, operation) {
                                                    if (data.models) {
                                                        return JSON.stringify({ products: data.models });
                                                    } else if (operation == "read") {
                                                        //Page methods always need values for their parameters
                                                        data = $.extend({ sort: null, filter: null }, data);
                                                        return JSON.stringify(data);
                                                    }
                                                },
                                                read: {
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: 'json',
                                                    type: "POST",
                                                    url: Url_Grid_Detail_2,
                                                    data: p
                                                }
                                            }
                                        },
                                        columns: Columns_Grid_Detail_2,
                                        dataBound: function () {
                                            if (grid_detail_2.dataSource.data().length > 0) {

                                                $('#grid_detail_2 .k-grid-header').show();

                                                //for (var a = 0; a < grid_detail_2.columns.length; a++) {
                                                //    grid_detail_2.autoFitColumn(a);
                                                //}
                                            }
                                            else {
                                                $('#grid_detail_2 .k-grid-header').hide();
                                            }
                                        }
                                    }).data("kendoGrid");
                                    break;
                                case CapTion_Tab_3:
                                    var grid_detail_2 = detailRow.find("#grid_detail_3").kendoGrid({
                                        pageable: {
                                            buttonCount: 3,
                                            input: true,
                                            messages: {
                                                display: 'Dòng {0} - {1} / {2} dòng',
                                                empty: 'Không có dữ liệu',
                                                first: 'Trang đầu',
                                                itemsPerPage: 'dòng / trang',
                                                last: 'Trang cuối',
                                                next: 'Trang sau',
                                                of: '/ {0} trang',
                                                page: 'Trang',
                                                previous: 'Trang trước'
                                            },
                                            pageSize: 10,
                                            pageSizes: [10, 20]
                                        },
                                        dataSource: {
                                            error: function (e) {
                                                checkSessionExpire(e, returnPage);
                                                Notify(
                                                    'Không load được danh sách...',
                                                    'bottom-right',
                                                    '5000',
                                                    'danger',
                                                    'fa-warning',
                                                    true
                                                );
                                            },
                                            serverPaging: true,
                                            serverSorting: true,
                                            serverFiltering: true,
                                            pageSize: 10,
                                            schema: {
                                                data: "d.Data",
                                                total: "d.Total"
                                            },
                                            transport: {
                                                parameterMap: function (data, operation) {
                                                    if (data.models) {
                                                        return JSON.stringify({ products: data.models });
                                                    } else if (operation == "read") {
                                                        //Page methods always need values for their parameters
                                                        data = $.extend({ sort: null, filter: null }, data);
                                                        return JSON.stringify(data);
                                                    }
                                                },
                                                read: {
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: 'json',
                                                    type: "POST",
                                                    url: Url_Grid_Detail_3,
                                                    data: p
                                                }
                                            }
                                        },
                                        columns: Columns_Grid_Detail_3,
                                        dataBound: function () {
                                            if (grid_detail_3.dataSource.data().length > 0) {

                                                $('#grid_detail_3 .k-grid-header').show();

                                                //for (var a = 0; a < grid_detail_3.columns.length; a++) {
                                                //    grid_detail_3.autoFitColumn(a);
                                                //}
                                            }
                                            else {
                                                $('#grid_detail_3 .k-grid-header').hide();
                                            }
                                        }
                                    }).data("kendoGrid");
                                    break;
                            }
                        }
                    });

                    var grid_detail_1 = detailRow.find("#grid_detail_1").kendoGrid({
                        pageable: {
                            buttonCount: 3,
                            input: true,
                            messages: {
                                display: 'Dòng {0} - {1} / {2} dòng',
                                empty: 'Không có dữ liệu',
                                first: 'Trang đầu',
                                itemsPerPage: 'dòng / trang',
                                last: 'Trang cuối',
                                next: 'Trang sau',
                                of: '/ {0} trang',
                                page: 'Trang',
                                previous: 'Trang trước'
                            },
                            pageSize: 10,
                            pageSizes: [10, 20]
                        },
                        dataSource: {
                            error: function (e) {
                                checkSessionExpire(e, returnPage);
                                Notify(
                                    'Không load được danh sách...',
                                    'bottom-right',
                                    '5000',
                                    'danger',
                                    'fa-warning',
                                    true
                                );
                            },
                            serverPaging: true,
                            serverSorting: true,
                            serverFiltering: true,
                            pageSize: 10,
                            schema: {
                                data: "d.Data",
                                total: "d.Total"
                            },
                            transport: {
                                parameterMap: function (data, operation) {
                                    if (data.models) {
                                        return JSON.stringify({ products: data.models });
                                    } else if (operation == "read") {
                                        //Page methods always need values for their parameters
                                        data = $.extend({ sort: null, filter: null }, data);
                                        return JSON.stringify(data);
                                    }
                                },
                                read: {
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    type: "POST",
                                    url: Url_Grid_Detail_1,
                                    data: p
                                }
                            }
                        },
                        columns: Columns_Grid_Detail_1,
                        dataBound: function () {
                            if (grid_detail_1.dataSource.data().length > 0) {
                                $('#grid_detail_1 .k-grid-header').show();
                                //for (var i = 0; i < this.columns.length; i++) {
                                //    grid_detail_1.autoFitColumn(i);
                                //}
                            }
                            else {
                                $('#grid_detail_1 .k-grid-header').hide();
                            }
                        }
                    }).data("kendoGrid");
                }
            });

            //bind click event to the checkbox
            grid.table.on("click", ".k-checkbox", function () {
                var checked = this.checked,
                     row = $(this).closest("tr"),
                     dataItem = grid.dataItem(row);

                checkedIds[dataItem.ID] = checked;
                if (checked) {
                    //-select the row
                    row.addClass("k-state-selected");
                } else {
                    //-remove selection
                    row.removeClass("k-state-selected");
                }
            });
            $('#header-chb').change(function (ev) {

                var checked = ev.target.checked;
                $('.row-checkbox').each(function (idx, item) {
                    if (checked) {
                        if (!($(item).closest('tr').is('.k-state-selected'))) {
                            $(item).click();
                        }
                    } else {
                        if ($(item).closest('tr').is('.k-state-selected')) {
                            $(item).click();
                        }
                    }
                });
            });
        },

        CofigGrid: function (
                FitColumn_Main,
                Columns_Main,
                Url_Main,
                Group_Main,
                DetailTemplate_Name,
                CapTion_Tab_1,
                Url_Grid_Detail_1,
                Columns_Grid_Detail_1,
                CapTion_Tab_2,
                Url_Grid_Detail_2,
                Columns_Grid_Detail_2,
                CapTion_Tab_3,
                Url_Grid_Detail_3,
                Columns_Grid_Detail_3
            ) {
            grid.setOptions({
                dataBound: function () {
                    if (FitColumn_Main) {
                        for (var i = 0; i < this.columns.length; i++) {
                            grid.autoFitColumn(i);
                        }
                    }
                    ///////////////////////
                    var view = grid.dataSource.view();
                    for (var i = 0; i < view.length; i++) {
                        if (checkedIds[view[i].ID]) {
                            this.tbody.find("tr[data-uid='" + view[i].uid + "']")
                                .addClass("k-state-selected")
                                .find(".k-checkbox")
                                .attr("checked", "checked");
                        }
                    }
                },
                columns: Columns_Main,
                dataSource: {
                    error: function (e) {
                        checkSessionExpire(e, returnPage);
                        Notify(
                            'Không load được danh sách...',
                            'bottom-right',
                            '5000',
                            'danger',
                            'fa-warning',
                            true
                        );
                    },
                    serverPaging: true,
                    serverSorting: true,
                    serverFiltering: true,
                    pageSize: 10,
                    schema: {
                        data: "d.Data",
                        total: "d.Total"
                    },
                    group: Group_Main,
                    transport: {
                        parameterMap: function (data, operation) {
                            if (data.models) {
                                return JSON.stringify({ products: data.models });
                            } else if (operation == "read") {
                                //Page methods always need values for their parameters
                                data = $.extend({ sort: null, filter: null }, data);
                                return JSON.stringify(data);
                            }
                        },
                        read: {
                            contentType: "application/json; charset=utf-8",
                            dataType: 'json',
                            type: "POST",
                            url: Url_Main
                        }
                    }
                },

                detailTemplate: kendo.template($("#" + DetailTemplate_Name + "").html()),
                detailExpand: function (e) {
                    this.collapseRow(this.tbody.find(' > tr.k-master-row').not(e.masterRow));
                },
                detailInit: function (e) {

                    var detailRow = e.detailRow;

                    detailRow.find("#tabstrip").kendoTabStrip({
                        animation: {
                            open: { effects: "fadeIn" }
                        },
                        select: function (select) {
                            var content_tab = $(select.item).find("> .k-link").text().trim();
                            switch (content_tab) {
                                case CapTion_Tab_1:
                                    grid_detail_1.dataSource.read();
                                    break;

                                case CapTion_Tab_2:
                                    var grid_detail_2 = detailRow.find("#grid_detail_2").kendoGrid({
                                        pageable: {
                                            buttonCount: 3,
                                            input: true,
                                            messages: {
                                                display: 'Dòng {0} - {1} / {2} dòng',
                                                empty: 'Không có dữ liệu',
                                                first: 'Trang đầu',
                                                itemsPerPage: 'dòng / trang',
                                                last: 'Trang cuối',
                                                next: 'Trang sau',
                                                of: '/ {0} trang',
                                                page: 'Trang',
                                                previous: 'Trang trước'
                                            },
                                            pageSize: 10,
                                            pageSizes: [10, 20]
                                        },
                                        dataSource: {
                                            error: function (e) {
                                                checkSessionExpire(e, returnPage);
                                                Notify(
                                                    'Không load được danh sách...',
                                                    'bottom-right',
                                                    '5000',
                                                    'danger',
                                                    'fa-warning',
                                                    true
                                                );
                                            },
                                            serverPaging: true,
                                            serverSorting: true,
                                            serverFiltering: true,
                                            pageSize: 10,
                                            schema: {
                                                data: "d.Data",
                                                total: "d.Total"
                                            },
                                            transport: {
                                                parameterMap: function (data, operation) {
                                                    if (data.models) {
                                                        return JSON.stringify({ products: data.models });
                                                    } else if (operation == "read") {
                                                        //Page methods always need values for their parameters
                                                        data = $.extend({ sort: null, filter: null }, data);
                                                        return JSON.stringify(data);
                                                    }
                                                },
                                                read: {
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: 'json',
                                                    type: "POST",
                                                    url: Url_Grid_Detail_2,
                                                    data: { ID: e.data.ID }
                                                }
                                            }
                                        },
                                        columns: Columns_Grid_Detail_2,
                                        dataBound: function () {
                                            if (grid_detail_2.dataSource.data().length > 0) {

                                                $('#grid_detail_2 .k-grid-header').show();

                                                //for (var a = 0; a < grid_detail_2.columns.length; a++) {
                                                //    grid_detail_2.autoFitColumn(a);
                                                //}
                                            }
                                            else {
                                                $('#grid_detail_2 .k-grid-header').hide();
                                            }
                                        }
                                    }).data("kendoGrid");
                                    break;
                                case CapTion_Tab_3:
                                    var grid_detail_3 = detailRow.find("#grid_detail_3").kendoGrid({
                                        pageable: {
                                            buttonCount: 3,
                                            input: true,
                                            messages: {
                                                display: 'Dòng {0} - {1} / {2} dòng',
                                                empty: 'Không có dữ liệu',
                                                first: 'Trang đầu',
                                                itemsPerPage: 'dòng / trang',
                                                last: 'Trang cuối',
                                                next: 'Trang sau',
                                                of: '/ {0} trang',
                                                page: 'Trang',
                                                previous: 'Trang trước'
                                            },
                                            pageSize: 10,
                                            pageSizes: [10, 20]
                                        },
                                        dataSource: {
                                            error: function (e) {
                                                checkSessionExpire(e, returnPage);
                                                Notify(
                                                    'Không load được danh sách...',
                                                    'bottom-right',
                                                    '5000',
                                                    'danger',
                                                    'fa-warning',
                                                    true
                                                );
                                            },
                                            serverPaging: true,
                                            serverSorting: true,
                                            serverFiltering: true,
                                            pageSize: 10,
                                            schema: {
                                                data: "d.Data",
                                                total: "d.Total"
                                            },
                                            transport: {
                                                parameterMap: function (data, operation) {
                                                    if (data.models) {
                                                        return JSON.stringify({ products: data.models });
                                                    } else if (operation == "read") {
                                                        //Page methods always need values for their parameters
                                                        data = $.extend({ sort: null, filter: null }, data);
                                                        return JSON.stringify(data);
                                                    }
                                                },
                                                read: {
                                                    contentType: "application/json; charset=utf-8",
                                                    dataType: 'json',
                                                    type: "POST",
                                                    url: Url_Grid_Detail_3,
                                                    data: { ID: e.data.ID }
                                                }
                                            }
                                        },
                                        columns: Columns_Grid_Detail_3,
                                        dataBound: function () {
                                            if (grid_detail_3.dataSource.data().length > 0) {

                                                $('#grid_detail_3 .k-grid-header').show();

                                                //for (var a = 0; a < grid_detail_3.columns.length; a++) {
                                                //    grid_detail_3.autoFitColumn(a);
                                                //}
                                            }
                                            else {
                                                $('#grid_detail_3 .k-grid-header').hide();
                                            }
                                        }
                                    }).data("kendoGrid");
                                    break;
                            }
                        }
                    });

                    var grid_detail_1 = detailRow.find("#grid_detail_1").kendoGrid({
                        pageable: {
                            buttonCount: 3,
                            input: true,
                            messages: {
                                display: 'Dòng {0} - {1} / {2} dòng',
                                empty: 'Không có dữ liệu',
                                first: 'Trang đầu',
                                itemsPerPage: 'dòng / trang',
                                last: 'Trang cuối',
                                next: 'Trang sau',
                                of: '/ {0} trang',
                                page: 'Trang',
                                previous: 'Trang trước'
                            },
                            pageSize: 10,
                            pageSizes: [10, 20]
                        },
                        dataSource: {
                            error: function (e) {
                                checkSessionExpire(e, returnPage);
                                Notify(
                                    'Không load được danh sách...',
                                    'bottom-right',
                                    '5000',
                                    'danger',
                                    'fa-warning',
                                    true
                                );
                            },
                            serverPaging: true,
                            serverSorting: true,
                            serverFiltering: true,
                            pageSize: 10,
                            schema: {
                                data: "d.Data",
                                total: "d.Total"
                            },
                            transport: {
                                parameterMap: function (data, operation) {
                                    if (data.models) {
                                        return JSON.stringify({ products: data.models });
                                    } else if (operation == "read") {
                                        //Page methods always need values for their parameters
                                        data = $.extend({ sort: null, filter: null }, data);
                                        return JSON.stringify(data);
                                    }
                                },
                                read: {
                                    contentType: "application/json; charset=utf-8",
                                    dataType: 'json',
                                    type: "POST",
                                    url: Url_Grid_Detail_1,
                                    data: { ID: e.data.ID }
                                }
                            }
                        },
                        columns: Columns_Grid_Detail_1,
                        dataBound: function () {
                            if (grid_detail_1.dataSource.data().length > 0) {
                                $('#grid_detail_1 .k-grid-header').show();
                                //for (var i = 0; i < this.columns.length; i++) {
                                //    grid_detail_1.autoFitColumn(i);
                                //}
                            }
                            else {
                                $('#grid_detail_1 .k-grid-header').hide();
                            }
                        }
                    }).data("kendoGrid");
                }
            });


            //bind click event to the checkbox
            grid.table.on("click", ".k-checkbox", function () {
                var checked = this.checked,
                     row = $(this).closest("tr"),
                     dataItem = grid.dataItem(row);

                checkedIds[dataItem.ID] = checked;
                if (checked) {
                    //-select the row
                    row.addClass("k-state-selected");
                } else {
                    //-remove selection
                    row.removeClass("k-state-selected");
                }
            });
            $('#header-chb').change(function (ev) {

                var checked = ev.target.checked;
                $('.row-checkbox').each(function (idx, item) {
                    if (checked) {
                        if (!($(item).closest('tr').is('.k-state-selected'))) {
                            $(item).click();
                        }
                    } else {
                        if ($(item).closest('tr').is('.k-state-selected')) {
                            $(item).click();
                        }
                    }
                });
            });
        },
        Read: function () {
            grid.dataSource.read();
        },
        GetListID: function () {
            var checked = [];
            for (var i in checkedIds) {
                if (checkedIds[i]) {
                    checked.push(i);
                }
            }
            return checked;
        },
        ClearSelect: function () {
            checkedIds = {};
            $('.row-checkbox').each(function (idx, item) {
                if ($(item).closest('tr').is('.k-state-selected')) {
                    $(item).click();
                }
            });
        },
        SelectRowbyID: function (Id) {
            var UID = "";
            for (var i = 0; i < $("#" + NameGrid + "").data("kendoGrid").dataSource.data().length; i++) {
                if ($("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i].ID === Id) {
                    UID = $("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i].uid;
                }
            }
            $("#" + NameGrid + "").data("kendoGrid").tbody.find("tr[data-uid='" + UID + "']")
                .addClass("k-state-selected")
                .find(".k-checkbox")
                .attr("checked", "checked");

            checkedIds[Id] = true;
        },
        GetItembyID: function (Id) {
            var item = [];
            for (var i = 0; i < $("#" + NameGrid + "").data("kendoGrid").dataSource.data().length; i++) {
                if ($("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i].ID === Id) {
                    item = $("#" + NameGrid + "").data("kendoGrid").dataSource.data()[i];
                }
            }
            return item;
        },
        GetAllItem: function () {
            var item1 = [];
            //for (var i = 0; i < $("#" + NameGrid + "").data("kendoGrid").dataSource.data().length; i++) {
            item1 = $("#" + NameGrid + "").data("kendoGrid").dataSource.data();
            //}
            return item1;
        },
        AjaxManyRows: function (ListID, Url, Module) {
            function deleteMultiRows(id, dObj) {
                $.ajax({
                    contentType: 'application/json; charset=utf-8',
                    data: JSON.stringify({ ID: id }),
                    dataType: 'json',
                    success: function () {
                        dObj.resolve();
                    },
                    fail: function () {
                        dObj.reject();
                    },
                    type: 'POST',
                    url: Url
                });
            }
            var arrayDeferred = [];
            for (var i = 0; i < ListID.length; i++) {
                var dObj = new $.Deferred();
                arrayDeferred.push(dObj);
                deleteMultiRows(parseInt(ListID[i]), dObj);
            }
            $.when.apply($, arrayDeferred).done(function () {
                Notify(
                    'Cập nhật thành công',
                     'bottom-right',
                      '5000',
                      'success',
                      'fa-check',
                       true
                       );
                Module.ClearSelect();
                Module.Read();
            })
            $.when.apply($, arrayDeferred).fail(function () {
                Notify(function (e) {
                    'Lỗi' + e,
                     'bottom-right',
                      '5000',
                      'fail',
                      'fa-check',
                       true
                });
            });
        },
        CheckExist: function (Url, NameField, Value, Func) {

            let db_filter = new kendo.data.DataSource({
                error: function (e) {
                    checkSessionExpire(e, returnPage);
                    Notify(
                        'Không load được danh sách...',
                        'bottom-right',
                        '5000',
                        'danger',
                        'fa-warning',
                        true
                    );
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
                schema: {
                    data: "d.Data",
                    total: "d.Total"
                },
                transport: {
                    parameterMap: function (data, operation) {
                        if (data.models) {
                            return JSON.stringify({ products: data.models });
                        } else if (operation == "read") {
                            //Page methods always need values for their parameters
                            data = $.extend({ sort: null, filter: null }, data);
                            return JSON.stringify(data);
                        }
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: "POST",
                        url: Url
                    }
                },
                filter:
                    {
                        logic: "and",
                        filters: [
                            { field: "" + NameField + "", operator: "eq", value: Value }
                        ]

                    }
            });
            db_filter.fetch(function () {
                var view = db_filter.view();
                if (view.length > 0) {
                    Func(false);

                }
                else {
                    Func(true);

                }
            });

        },
        CheckExistWithPara: function (Url, NameField, Value, Param, Func) {

            let db_filter = new kendo.data.DataSource({
                error: function (e) {
                    checkSessionExpire(e, returnPage);
                    Notify(
                        'Không load được danh sách...',
                        'bottom-right',
                        '5000',
                        'danger',
                        'fa-warning',
                        true
                    );
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
                schema: {
                    data: "d.Data",
                    total: "d.Total"
                },
                transport: {
                    parameterMap: function (data, operation) {
                        if (data.models) {
                            return JSON.stringify({ products: data.models });
                        } else if (operation == "read") {
                            //Page methods always need values for their parameters
                            data = $.extend({ sort: null, filter: null }, data);
                            return JSON.stringify(data);
                        }
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: "POST",
                        url: Url,
                        data: Param
                    }
                },
                filter:
                    {
                        logic: "and",
                        filters: [
                            { field: "" + NameField + "", operator: "eq", value: Value }
                        ]

                    }
            });
            db_filter.fetch(function () {
                var view = db_filter.view();
                if (view.length > 0) {
                    Func(false);

                }
                else {
                    Func(true);

                }
            });

        },
        CheckExist2Field: function (Url, NameField1, Value1, NameField2, Value2, Func) {

            let db_filter = new kendo.data.DataSource({
                error: function (e) {
                    checkSessionExpire(e, returnPage);
                    Notify(
                        'Không load được danh sách...',
                        'bottom-right',
                        '5000',
                        'danger',
                        'fa-warning',
                        true
                    );
                },
                serverPaging: true,
                serverSorting: true,
                serverFiltering: true,
                pageSize: 10,
                schema: {
                    data: "d.Data",
                    total: "d.Total"
                },
                transport: {
                    parameterMap: function (data, operation) {
                        if (data.models) {
                            return JSON.stringify({ products: data.models });
                        } else if (operation == "read") {
                            //Page methods always need values for their parameters
                            data = $.extend({ sort: null, filter: null }, data);
                            return JSON.stringify(data);
                        }
                    },
                    read: {
                        contentType: "application/json; charset=utf-8",
                        dataType: 'json',
                        type: "POST",
                        url: Url
                    }
                },
                filter:
                    {
                        logic: "and",
                        filters: [
                            { field: "" + NameField1 + "", operator: "eq", value: Value1 },
                            { field: "" + NameField2 + "", operator: "eq", value: Value2 }
                        ]
                    }
            });
            db_filter.fetch(function () {
                var view = db_filter.view();
                if (view.length > 0) {
                    Func(false);
                }
                else {
                    Func(true);
                }
            });

        }


    }
}


// Person Module
// Demo http://jsfiddle.net/41ootg5f/
var Person = function (name) {
    
    // Private variables and functions that only
    // ..other private or public functions may access
    // ..and cannot be accessed outside this Module
    var age = 0,
        maxAge = 20,
        maxWeight = 40,
        isAlive = true,
        weight = 20,
        name = name || 'Un-named';

    var growOld = function () {
        age = age + 3;
        if (age >= maxAge) {
            die();
        }
    }
    var gainWeight = function () {
        if (weight++ >= maxWeight) {
            die();
        }
    }

    var loseWeight = function () {
        if (weight-- <= 0) {
            die();
        }
    }

    var die = function () { isAlive = false; }


    // All the properties and methods contained by 
    // ..this object being returned will be public
    // ..and will be accessible in the global scope.
    return {
        speak: function () {
            if (!isAlive) {
                alert('Dead man can\'t speak.');
                return;
            }

            alert(name + ': Speaking..');
            growOld();
        },

        walk: function () {
            if (!isAlive) {
                alert('Dead man can\'t walk');
                return;
            }

            alert(name + ': Walking');
            growOld();
            loseWeight();
        },

        eat: function () {
            if (!isAlive) {
                alert('Dead man can\'t eat');
            }
            alert(name + ': Eating..');
            gainWeight();
        },

        getInfo: function () {
            alert("Age: " + age + "/" + maxAge + "\nWeight: " + weight + "/" + maxWeight);
        }
    }
}
